import type express from "express";
import { v4 as uuid } from "uuid";
import { Readable } from "node:stream";
import type { MockDataStore } from "../data-store";
import type {
  CreateVdiBody,
  XoHost,
  XoPbd,
  XoPool,
  XoVdi,
  Branded,
  VDI_TYPE,
} from "../types";
// @ts-expect-error - no types for vhd-lib
import * as vhd from "vhd-lib";
import { randomBytes } from "node:crypto";
import {
  CreateSuccessTask,
  CreateFailedTask,
  UpdateAllTasksForObject,
} from "../tasks";

function resolvePoolId(
  srId: Branded<"SR">,
  dataStore: MockDataStore,
): Branded<"pool"> | undefined {
  const pools = dataStore.getResource("pools");
  const pbds = dataStore.getResource("pbds");
  const hosts = dataStore.getResource("hosts");

  const poolBySr = pools.find((p: XoPool) => p.default_SR === srId) as
    | XoPool
    | undefined;
  if (poolBySr) return poolBySr.id;

  const pbd = pbds.find((p: XoPbd) => p.SR === srId && p.attached) as
    | XoPbd
    | undefined;
  if (!pbd) return undefined;

  const host = hosts.find(
    (h: XoHost) => h.id === pbd.host || h.uuid === pbd.host,
  ) as XoHost | undefined;
  if (!host) return undefined;

  const hostId = host.id || host.uuid;
  const pool = pools.find((p: XoPool) => p.master === hostId) as
    | XoPool
    | undefined;
  return pool?.id;
}

export function registerVdiHandlers(
  app: express.Application,
  dataStore: MockDataStore,
) {
  app.get("/rest/v0/vdis/:id.:format", (req, res) =>
    exportVdi(req, res, dataStore),
  );
  app.post("/rest/v0/vdis", (req, res) => createEmptyVdi(req, res, dataStore));
  app.put("/rest/v0/vdis/:id.:format", (req, res) =>
    importVdi(req, res, dataStore),
  );
  app.post("/rest/v0/vdis/:id/actions/migrate", (req, res) =>
    migrate(req, res, dataStore),
  );
  app.get("/rest/v0/vms/:id/vdis", (req, res) =>
    getVMVDIs(req, res, dataStore),
  );
}

export function createVdiInStore(
  dataStore: MockDataStore,
  srId: Branded<"SR">,
  poolId: Branded<"pool">,
  options: {
    size: number;
    name_label?: string;
    name_description?: string;
    type?: VDI_TYPE;
    tags?: string[];
    other_config?: Record<string, string>;
  },
): { id: Branded<"VDI"> } {
  const id = uuid();
  const vdi: XoVdi = {
    id: id as Branded<"VDI">,
    uuid: id,
    $SR: srId,
    VDI_type: options.type ?? "user",
    size: options.size,
    tags: options.tags ?? [],
    other_config: options.other_config ?? {},
    name_label: options.name_label ?? "",
    name_description: options.name_description ?? "",
    type: "VDI" as const,
    usage: 0,
    chainPhysicalUsage: 0,
    missing: false,
    cbt_enabled: false,
    current_operations: {},
    $VBDs: [],
    $pool: poolId,
    $poolId: poolId,
    snapshots: [],
    _xapiRef: "",
  };

  dataStore.addItem("vdis", vdi);
  return { id: id as Branded<"VDI"> };
}

function createEmptyVdi(
  req: express.Request,
  res: express.Response,
  dataStore: MockDataStore,
) {
  const body = req.body as CreateVdiBody;

  if (!body.srId) {
    return res.status(400).json({
      error: "srId is required",
      data: { id: null, type: "SR" },
    });
  }

  if (body.virtual_size == null) {
    return res.status(400).json({
      error: "virtual_size is required",
      data: { id: body.srId, type: "SR" },
    });
  }

  const sr = dataStore.findById("srs", body.srId);
  if (!sr) {
    return res.status(404).json({
      error: `no such SR ${body.srId}`,
      data: { id: body.srId, type: "SR" },
    });
  }

  // Mirror the real XO controller: extract srId + sm_config, spread the rest
  const { srId, sm_config, ...rest } = body;

  const poolId = resolvePoolId(srId, dataStore);
  const { id } = createVdiInStore(
    dataStore,
    srId,
    poolId ?? ("" as Branded<"pool">),
    {
      size: rest.virtual_size,
      name_label: rest.name_label,
      name_description: rest.name_description,
      type: rest.type,
      tags: rest.tags,
      other_config: rest.other_config,
    },
  );

  res.status(201).json({ id });
}

async function exportVdi(
  req: express.Request,
  res: express.Response,
  dataStore: MockDataStore,
) {
  const { id, format } = req.params;
  const vdi = dataStore.findById("vdis", id);

  if (!vdi) {
    return res.status(404).json({
      error: `no such VDI ${id}`,
      data: { id, type: "VDI" },
    });
  }

  // Validate format
  const diskFormat = format.toLowerCase();
  if (!["vhd", "raw"].includes(diskFormat)) {
    return res.status(400).json({
      error: `unsupported disk format '${format}' (must be vhd or raw)`,
      data: { id, type: "VDI" },
    });
  }

  // Get VDI size in bytes
  const vdiSize = Number(vdi.size) || 1073741824; // Default to 1GB if size missing
  if (isNaN(vdiSize) || vdiSize <= 0) {
    return res.status(400).json({
      error: `invalid VDI size: ${vdi.size}`,
      data: { id, type: "VDI" },
    });
  }

  // Set response headers
  const filename = (vdi.name_label || "disk") + "." + diskFormat;
  res.status(200).contentType("application/octet-stream");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

  try {
    if (diskFormat === "raw") {
      const rawStream = createRandomRawStream(vdiSize);
      res.setHeader("Content-Length", String(vdiSize));
      return rawStream.pipe(res);
    }

    const vhdStream = await vhd.createReadableSparseStream(
      vdiSize,
      vhd.Constants.DEFAULT_BLOCK_SIZE,
      buildFragmentAddresses(vdiSize, vhd.Constants.DEFAULT_BLOCK_SIZE),
      zeroFragments(vdiSize, vhd.Constants.DEFAULT_BLOCK_SIZE),
    );

    res.setHeader("Content-Length", String(vhdStream.length));
    return vhdStream.pipe(res);
  } catch (err) {
    console.error(`Error generating disk:`, err);
    res.status(500).json({
      error: "disk generation failed",
      details: err instanceof Error ? err.message : "Unknown error",
      data: { id, type: "VDI" },
    });
  }
}

function buildFragmentAddresses(
  diskSize: number,
  fragmentSize: number,
): number[] {
  const fragments: number[] = [];
  for (let address = 0; address < diskSize; address += fragmentSize) {
    fragments.push(address / fragmentSize);
  }
  return fragments;
}

async function* zeroFragments(diskSize: number, fragmentSize: number) {
  const fragmentCount = Math.ceil(diskSize / fragmentSize);
  for (let i = 0; i < fragmentCount; i++) {
    const remaining = diskSize - i * fragmentSize;
    yield {
      logicalAddressBytes: i * fragmentSize,
      data: Buffer.alloc(Math.min(fragmentSize, remaining)),
    };
  }
}

function createRandomRawStream(size: number) {
  async function* iterator() {
    let remaining = size;
    while (remaining > 0) {
      const chunkSize = Math.min(vhd.Constants.SECTOR_SIZE, remaining);
      yield randomBytes(chunkSize);
      remaining -= chunkSize;
    }
  }

  return Readable.from(iterator());
}

async function importVdi(
  req: express.Request,
  res: express.Response,
  dataStore: MockDataStore,
) {
  const { id, format } = req.params;
  const vdi = dataStore.findById("vdis", id);

  if (!vdi) {
    return res.status(404).json({
      error: `no such VDI ${id}`,
      data: { id, type: "VDI" },
    });
  }

  // Validate format
  const diskFormat = format.toLowerCase();
  if (!["vhd", "raw"].includes(diskFormat)) {
    return res.status(400).json({
      error: `unsupported disk format '${format}' (must be vhd or raw)`,
      data: { id, type: "VDI" },
    });
  }

  // For this mock implementation, we won't actually process the uploaded disk data.

  // Respond with a success message
  res.status(204).send();
}

async function migrate(
  req: express.Request,
  res: express.Response,
  dataStore: MockDataStore,
) {
  const { id, format } = req.params;
  const vdi = dataStore.findById("vdis", id);

  if (!vdi) {
    return res.status(404).json({
      error: `no such VDI ${id}`,
      data: { id, type: "VDI" },
    });
  }

  const body = req.body as { srId: string };
  if (!body.srId) {
    return res.status(400).json({
      error: "srId is required for migration",
      data: { id, type: "VDI" },
    });
  }

  const targetSr = dataStore.findById("srs", body.srId);
  if (!targetSr) {
    const task = CreateFailedTask(dataStore, {
      objectType: "VDI",
      objectId: id,
      name: "REST API: migrate VDI",
      type: "xo:mock:action",
      result: {
        message: `no such object ${id}`,
        code: 1,
        data: { id, type: "SR" },
      },
    });
    return res.status(202).json({
      taskId: task.id,
    });
  }

  // For this mock implementation, we'll just update the VDI's SR reference.
  vdi.$SR = body.srId;
  vdi.id = uuid(); // Change ID to simulate creation of a new VDI on the target SR
  dataStore.updateItem("vdis", id, vdi);

  // Update existing tasks related to the old VDI to point to the new VDI ID
  UpdateAllTasksForObject(dataStore, "VDI", id, {
    properties: { objectId: vdi.id },
  });

  const task = CreateSuccessTask(dataStore, {
    objectType: "VDI",
    objectId: vdi.id,
    name: `VDI migrate to SR ${body.srId}`,
    type: "xo:mock:action",
    result: { id: vdi.id },
  });

  // Return 202 Accepted for success
  return res.status(202).json({
    taskId: task.id,
  });
}

async function getVMVDIs(
  req: express.Request,
  res: express.Response,
  dataStore: MockDataStore,
) {
  const { id } = req.params;

  // Validate referenced VM exists
  const vm = dataStore.findById("vms", id);
  if (!vm) {
    return res.status(404).json({
      error: `no such VM ${id}`,
      data: { id, type: "VM" },
    });
  }

  // Get the VDI IDs associated with the VM's VBDs
  const vbdIds = vm.$VBDs || [];
  const vdis: XoVdi[] = (
    vbdIds.map((vbdId: string) => {
      const vbd = dataStore.findById("vbds", vbdId);
      if (!vbd) return null;
      return dataStore.findById("vdis", vbd.VDI) as XoVdi;
    }) as (XoVdi | null)[]
  ).filter((vdi) => vdi !== null) as XoVdi[];

  return res.status(200).json(vdis);
}

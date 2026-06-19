import type express from "express";
import { v4 as uuid } from "uuid";
import { Readable } from "node:stream";
import type { MockDataStore } from "../data-store";
import type { CreateVdiBody, XoHost, XoPbd, XoPool } from "../types";
// @ts-expect-error - no types for vhd-lib
import * as vhd from "vhd-lib";
import { randomBytes } from "node:crypto";

function resolvePoolId(
  srId: string,
  dataStore: MockDataStore,
): string | undefined {
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
  const id = uuid();

  const vdi = {
    ...rest,
    id,
    uuid: id,
    $SR: srId,
    VDI_type: rest.type ?? "user",
    size: rest.virtual_size,
    tags: rest.tags ?? [],
    other_config: rest.other_config ?? {},
    name_label: rest.name_label ?? "",
    name_description: rest.name_description ?? "",
    // override VDI_TYPE value from rest with the XO object discriminator
    type: "VDI" as const,
    // computed mock-only fields
    physical_usage: 0,
    usage: 0,
    missing: false,
    cbt_enabled: false,
    current_operations: {},
    $VBDs: [],
    $pool: poolId,
    $poolId: poolId,
    snapshots: [],
  };

  dataStore.addItem("vdis", vdi);
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

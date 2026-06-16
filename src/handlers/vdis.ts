import type express from "express";
import { v4 as uuid } from "uuid";
import type { MockDataStore } from "../data-store";
import type { CreateVdiBody, XoHost, XoPbd, XoPool } from "../types";

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

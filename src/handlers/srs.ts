import type express from "express";
import { v4 as uuid } from "uuid";
import type { MockDataStore } from "../data-store";
import type { CreateSrBody } from "../types";
import { CreateSuccessTask } from "../tasks";

export function registerSRHandlers(
  app: express.Application,
  dataStore: MockDataStore,
) {
  app.post("/rest/v0/srs", (req, res) => createSr(req, res, dataStore));
  app.post("/rest/v0/srs/:id/actions/:action", (req, res) =>
    doAction(req, res, dataStore),
  );
}

function createSr(
  req: express.Request,
  res: express.Response,
  dataStore: MockDataStore,
) {
  const body = req.body as CreateSrBody;
  if (!body.hostId || !body.SR_type) {
    return res.status(400).json({
      error: `${!body.hostId ? "hostId" : "SR_type"} is required`,
      data: { id: null, type: "SR" },
    });
  }
  const host = dataStore.findById("hosts", body.hostId);
  if (!host) {
    return res.status(404).json({
      error: `no such HOST ${body.hostId}`,
      data: { id: body.hostId, type: "HOST" },
    });
  }
  if (body.SR_type === "linstor") {
    return res
      .status(501)
      .json({ error: "XOSTOR SR creation is not implemented" });
  }
  const { hostId, SR_type, size, ...rest } = body;
  const id = uuid();
  dataStore.addItem("srs", {
    ...rest,
    id,
    uuid: id,
    type: "SR",
    SR_type,
    size: size ?? 0,
    physical_size: size ?? 0,
    physical_usage: 0,
    usage: 0,
    shared: !["ext", "file", "lvm", "udev", "xfs", "zfs"].includes(SR_type),
    $PBDs: [],
    $VDIs: [],
    $pool: host.$poolId ?? host.$pool,
  });
  return res.status(201).json({ id });
}

function doAction(
  req: express.Request,
  res: express.Response,
  dataStore: MockDataStore,
) {
  const { id, action } = req.params;

  // Validate referenced SR exists
  const sr = dataStore.findById("srs", id);
  if (!sr) {
    return res.status(404).json({
      error: `no such SR ${id}`,
      data: { id, type: "SR" },
    });
  }

  // Handle actions
  switch (action) {
    case "reclaim_space":
    case "scan":
      break;
    case "forget":
      // Remove the SR from the data store
      dataStore.deleteItem("srs", id);
      break;
    default:
      return res.status(400).json({
        error: `invalid action ${action}`,
        data: { id, type: "SR" },
      });
  }

  const task = CreateSuccessTask(dataStore, {
    objectType: "SR",
    objectId: id,
    name: `SR ${action}`,
    type: "xo:mock:action",
  });
  // Return 202 Accepted for success
  return res.status(202).json({
    taskId: task.id,
  });
}

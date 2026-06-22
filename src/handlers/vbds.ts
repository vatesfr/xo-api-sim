import type express from "express";
import { v4 as uuid } from "uuid";
import type { MockDataStore } from "../data-store";
import type { CreateVbdBody } from "../types";
import { CreateSuccessTask } from "../tasks";

export function registerVbdHandlers(
  app: express.Application,
  dataStore: MockDataStore,
) {
  app.post("/rest/v0/vbds", (req, res) => createVbd(req, res, dataStore));
  app.post("/rest/v0/vbds/:id/actions/:action", (req, res) =>
    doAction(req, res, dataStore),
  );
}

function createVbd(
  req: express.Request,
  res: express.Response,
  dataStore: MockDataStore,
) {
  const body = req.body as CreateVbdBody;

  // Validate required fields
  if (!body.VM) {
    return res.status(400).json({
      error: "VM is required",
      data: { id: null, type: "VBD" },
    });
  }

  if (!body.VDI) {
    return res.status(400).json({
      error: "VDI is required",
      data: { id: null, type: "VBD" },
    });
  }

  // Validate referenced VM exists
  const vm = dataStore.findById("vms", body.VM);
  if (!vm) {
    return res.status(404).json({
      error: `no such VM ${body.VM}`,
      data: { id: body.VM, type: "VM" },
    });
  }

  // Validate referenced VDI exists
  const vdi = dataStore.findById("vdis", body.VDI);
  if (!vdi) {
    return res.status(404).json({
      error: `no such VDI ${body.VDI}`,
      data: { id: body.VDI, type: "VDI" },
    });
  }

  // Validate VM and VDI are in the same pool
  if (vm.$pool !== vdi.$pool) {
    return res.status(400).json({
      error: "VM and VDI must be in the same pool",
      data: { id: null, type: "VBD" },
    });
  }

  // Determine device index
  const existingVbds = dataStore
    .getResource("vbds")
    .filter((vbd: any) => vbd.$VM === body.VM);
  const usedDevices = existingVbds
    .map((vbd: any) => vbd.device)
    .filter((d: string) => d !== undefined);
  let deviceIndex = 0;
  while (usedDevices.includes(String(deviceIndex))) {
    deviceIndex++;
  }

  // Build the stored object
  const id = uuid();
  const vbd = {
    id,
    uuid: id,
    $VM: body.VM,
    $VDI: body.VDI,
    device: String(deviceIndex),
    position: deviceIndex,
    bootable: body.bootable ?? false,
    mode: body.mode ?? "RW",
    type: body.type ?? "User",
    attached: true,
    current_operations: {},
    $pool: vm.$pool,
  };

  dataStore.addItem("vbds", vbd);

  return res.status(201).json({
    id,
  });
}

function doAction(
  req: express.Request,
  res: express.Response,
  dataStore: MockDataStore,
) {
  const { id, action } = req.params;

  // Validate referenced VBD exists
  const vbd = dataStore.findById("vbds", id);
  if (!vbd) {
    return res.status(404).json({
      error: `no such VBD ${id}`,
      data: { id, type: "VBD" },
    });
  }

  // Handle actions
  switch (action) {
    case "connect":
      vbd.attached = true;
      break;
    case "disconnect":
      vbd.attached = false;
      break;
    default:
      return res.status(400).json({
        error: `invalid action ${action}`,
        data: { id, type: "VBD" },
      });
  }

  // Update the item in the data store
  dataStore.updateItem("vbds", id, { attached: vbd.attached });

  const task = CreateSuccessTask(dataStore, {
    objectType: "VBD",
    objectId: id,
    name: `VBD ${action}`,
    type: "xo:mock:action",
  });
  // Return 202 Accepted for success
  return res.status(202).json({
    taskId: task.id,
  });
}

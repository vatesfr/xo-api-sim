import type express from "express";
import { v4 as uuid } from "uuid";
import type { MockDataStore } from "../data-store";
import type { Branded, CreateVbdBody, XoVbd } from "../types";
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

export function createVbdInStore(
  dataStore: MockDataStore,
  vmId: Branded<"VM">,
  vdiId: Branded<"VDI">,
  poolId: Branded<"pool">,
  options: {
    bootable?: boolean;
    read_only?: boolean;
    type?: "System" | "User" | "CD" | "DVD" | "Other";
  } = {},
): { id: Branded<"VBD"> } {
  // Determine device index
  const existingVbds = dataStore
    .getResource("vbds")
    .filter((vbd: XoVbd) => vbd.VM === vmId);
  const usedDevices = new Set(
    existingVbds
      .map((vbd: XoVbd) => vbd.device)
      .filter((d: string | null) => d !== null),
  );
  let deviceIndex = 0;
  while (usedDevices.has(String(deviceIndex))) {
    deviceIndex++;
  }

  const id = uuid();
  const vbd: XoVbd = {
    id: id as Branded<"VBD">,
    uuid: id,
    VM: vmId,
    VDI: vdiId,
    device: String(deviceIndex),
    position: String(deviceIndex),
    bootable: options.bootable ?? deviceIndex === 0,
    type: "VBD" as const,
    attached: true,
    $pool: poolId,
    $poolId: poolId,
    _xapiRef: "",
    is_cd_drive: false,
    read_only: options.read_only ?? false,
  };

  dataStore.addItem("vbds", vbd);
  return { id: id as Branded<"VBD"> };
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

  const { id } = createVbdInStore(dataStore, body.VM, body.VDI, vm.$pool, {
    bootable: body.bootable,
    read_only: body.mode === "RO",
    type: body.type,
  });

  // Update the VM's $VBDs array
  vm.$VBDs = [...(vm.$VBDs || []), id];
  dataStore.updateItem("vms", body.VM, { $VBDs: vm.$VBDs });

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
  const vbd = dataStore.findById("vbds", id) as XoVbd | undefined;
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

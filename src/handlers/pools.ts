import type express from "express";
import { v4 as uuid } from "uuid";
import type { MockDataStore } from "../data-store";
import type { CreateVmBody } from "../types";
import { CreateSuccessTask } from "../tasks";

export function registerPoolHandlers(
  app: express.Application,
  dataStore: MockDataStore,
) {
  app.post("/rest/v0/pools/:id/actions/create_vm", (req, res) =>
    createVm(req, res, dataStore),
  );
}

function createVm(
  req: express.Request,
  res: express.Response,
  dataStore: MockDataStore,
) {
  const body = req.body as CreateVmBody;

  const pool = dataStore.findById("pools", req.params.id);
  if (!pool) {
    return res.status(404).json({
      error: `no such pool ${req.params.id}`,
      data: { id: req.params.id, type: "POOL" },
    });
  }

  // Validate required fields
  if (!body.template) {
    return res.status(400).json({
      error: "template is required",
      data: { id: null, type: "VM" },
    });
  }

  // Validate template exists
  const tpl = dataStore.findById("vm-templates", body.template);
  if (!tpl) {
    return res.status(404).json({
      error: `no such VM template ${body.template}`,
      data: { id: body.template, type: "VM_TEMPLATE" },
    });
  }

  // Mirror the real XO controller's destructuring
  const {
    template,
    affinity,
    vdis,
    install,
    cloud_config,
    network_config,
    boot,
    destroy_cloud_config_vdi,
    createVtpm,
    ...rest
  } = body;

  // Build the stored object with generated + computed fields
  const id = uuid();
  const vm = {
    ...rest,
    id,
    uuid: id,
    $pool: pool.id,
    $poolId: pool.id,
    $TEMPLATE: template,
    $AFFINITY_HOST: affinity,
    type: "VM" as const,
    power_state: boot === true ? "Running" : "Halted",
    current_operations: {},
    mainIpAddress: `10.0.0.${Math.floor(Math.random() * 254) + 1}`,
  };

  dataStore.addItem("vms", vm);

  const task = CreateSuccessTask(dataStore, {
    objectType: "VM",
    objectId: vm.id,
    name: `VM create in pool ${pool.id}`,
    type: "xo:mock:action",
    result: { id: vm.id },
  });

  // Return 201 Created for success
  return res.status(201).json({
    taskId: task.id,
  });
}

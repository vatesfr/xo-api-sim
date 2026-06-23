import type express from "express";
import { v4 as uuid } from "uuid";
import type { MockDataStore } from "../data-store";
import type {
  CreateVmBody,
  XoVm,
  Branded,
  XoVmTemplate,
  XoPool,
  XoVbd,
  XoVdi,
} from "../types";
import { CreateSuccessTask } from "../tasks";
import { createVdiInStore } from "./vdis";
import { createVbdInStore } from "./vbds";

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

  const pool = dataStore.findById("pools", req.params.id) as XoPool | undefined;
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
  const tpl = dataStore.findById("vm-templates", body.template) as
    | XoVmTemplate
    | undefined;
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
  } as unknown as XoVm;

  const createdVbdIds: Branded<"VBD">[] = [];

  // Determine disk configs: body.vdis takes precedence, then template $VBDs fallback
  if (vdis && vdis.length > 0) {
    for (const vdiConfig of vdis) {
      // Skip destroy entries
      if ("destroy" in vdiConfig && vdiConfig.destroy === true) {
        continue;
      }

      // Determine SR to use
      if (!pool.default_SR) {
        console.log(
          `No default SR for pool ${pool.id}, skipping VDI creation (template ${tpl.name_label})`,
        );
        continue;
      }
      // Create VDI
      const { id: vdiId } = createVdiInStore(dataStore, pool.default_SR, pool.id, {
        size: ("size" in vdiConfig && vdiConfig.size) || 1073741824,
        name_label:
          "name_label" in vdiConfig ? vdiConfig.name_label : "Created by fake-xo-api",
        name_description:
          "name_description" in vdiConfig
            ? vdiConfig.name_description
            : undefined,
      });

      // Create VBD
      const { id: vbdId } = createVbdInStore(dataStore, vm.id, vdiId, pool.id);
      createdVbdIds.push(vbdId);
    }
  } else {
    // Fallback: clone disks from template's $VBDs
    const templateVbdIds = tpl.$VBDs ?? [];
    if (templateVbdIds.length > 0) {
      for (const templateVbdId of templateVbdIds) {
        const templateVbd = dataStore.findById("vbds", templateVbdId) as
          | XoVbd
          | undefined;
        if (!templateVbd) {
          console.log(
            `Template VBD ${String(templateVbdId)} not found, skipping (template ${tpl.name_label})`,
          );
          continue;
        }
        const templateVdi = dataStore.findById(
          "vdis",
          String(templateVbd.VDI),
        ) as XoVdi | undefined;
        if (!templateVdi) {
          console.log(
            `Template VDI ${String(templateVbd.VDI)} not found, skipping (template ${tpl.name_label})`,
          );
          continue;
        }

        // Create new VDI matching template
        const { id: vdiId } = createVdiInStore(
          dataStore,
          pool.default_SR ?? ("" as Branded<"SR">),
          pool.id,
          {
            size: templateVdi.size,
            name_label: templateVdi.name_label,
            name_description: templateVdi.name_description,
          },
        );

        // Create new VBD matching template
        const { id: vbdId } = createVbdInStore(
          dataStore,
          vm.id,
          vdiId,
          pool.id,
          {
            bootable: templateVbd.bootable,
            read_only: templateVbd.read_only,
            type: "User",
          },
        );
        createdVbdIds.push(vbdId);
      }
    }
  }

  // Link created VBDs to the VM
  if (createdVbdIds.length > 0) {
    vm.$VBDs = createdVbdIds;
  }

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

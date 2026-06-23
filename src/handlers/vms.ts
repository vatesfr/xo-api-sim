import type express from "express";
import type { MockDataStore } from "../data-store";
import type { XoVm, Branded } from "../types";
import { CreateSuccessTask } from "../tasks";
import { v4 as uuid } from "uuid";

export function registerVmHandlers(
  app: express.Application,
  dataStore: MockDataStore,
) {
  app.post("/rest/v0/vms/:id/actions/:action", (req, res) =>
    doAction(req, res, dataStore),
  );
}

async function doAction(
  req: express.Request,
  res: express.Response,
  dataStore: MockDataStore,
) {
  const { id, action } = req.params;

  const vm = dataStore.findById("vms", id) as XoVm | undefined;
  if (!vm) {
    return res.status(404).json({
      error: `no such VM ${id}`,
      data: { id, type: "VM" },
    });
  }

  switch (action) {
    case "start":
    case "clean_reboot":
    case "hard_reboot":
    case "resume":
    case "unpause":
      vm.power_state = "Running";
      break;
    case "clean_shutdown":
    case "hard_shutdown":
      vm.power_state = "Halted";
      break;
    case "suspend":
      vm.power_state = "Suspended";
      break;
    case "pause":
      vm.power_state = "Paused";
      break;
    case "snapshot": {
      // fake snapshot creation
      const snapshotId = uuid() as Branded<"VM-snapshot">;
      vm.snapshots = vm.snapshots || [];
      vm.snapshots.push(snapshotId);
      break;
    }
    case "revert_snapshot": {
      const body = req.body as { snapshotId: string; snapshotBefore: boolean };
      if (!body.snapshotId) {
        return res.status(400).json({
          error: "snapshotId is required",
          data: { id, type: "VM" },
        });
      }
      vm.snapshots = vm.snapshots || [];
      if (!vm.snapshots.includes(body.snapshotId as Branded<"VM-snapshot">)) {
        return res.status(404).json({
          error: `no such snapshot ${body.snapshotId}`,
          data: { id, type: "VM" },
        });
      }
      if (body.snapshotBefore) {
        // fake snapshot creation before revert
        const snapshotId = uuid() as Branded<"VM-snapshot">;
        vm.snapshots.push(snapshotId);
      }
      // fake revert snapshot by removing snapshot id
      vm.snapshots = vm.snapshots.filter(
        (s) => s !== (body.snapshotId as Branded<"VM-snapshot">),
      );
      break;
    }
    default:
      return res.status(400).json({
        error: `invalid action ${action}`,
        data: { id, type: "VM" },
      });
  }

  // Update the item in the data store
  dataStore.updateItem("vms", id, {
    power_state: vm.power_state,
    snapshots: vm.snapshots,
  });

  const task = CreateSuccessTask(dataStore, {
    objectType: "VM",
    objectId: id,
    name: `VM ${action}`,
    type: "xo:mock:action",
  });
  // Return 202 Accepted for success
  return res.status(202).json({
    taskId: task.id,
  });
}

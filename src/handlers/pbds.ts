import type express from "express";
import type { MockDataStore } from "../data-store";
import { generateTaskId, createSuccessTask } from "../tasks";

export function registerPbdHandlers(
  app: express.Application,
  dataStore: MockDataStore,
) {
  app.post("/rest/v0/pbds/:id/actions/:action", (req, res) =>
    doAction(req, res, dataStore),
  );
}

function doAction(
  req: express.Request,
  res: express.Response,
  dataStore: MockDataStore,
) {
  const { id, action } = req.params;

  // Validate referenced PBD exists
  const pbd = dataStore.findById("pbds", id);
  if (!pbd) {
    return res.status(404).json({
      error: `no such PBD ${id}`,
      data: { id, type: "PBD" },
    });
  }

  // Handle actions
  switch (action) {
    case "plug":
      pbd.attached = true;
      break;
    case "unplug":
      pbd.attached = false;
      break;
    default:
      return res.status(400).json({
        error: `invalid action ${action}`,
        data: { id, type: "PBD" },
      });
  }

  // Update the item in the data store
  dataStore.updateItem("pbds", id, { attached: pbd.attached });

  const task = createSuccessTask(dataStore);
  // Return 202 Accepted for success
  return res.status(202).json({
    taskId: task.id,
  });
}

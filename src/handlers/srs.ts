import type express from "express";
import type { MockDataStore } from "../data-store";
import { createSuccessTask, createFailedTask } from "../tasks";

export function registerSRHandlers(
  app: express.Application,
  dataStore: MockDataStore,
) {
  app.post("/rest/v0/srs/:id/actions/:action", (req, res) =>
    doAction(req, res, dataStore),
  );
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
    const task = createFailedTask(dataStore, {
      objectType: "SR",
      objectId: id,
      name: `SR ${action}`,
      type: "xo:mock:action",
      result: {
        message: `no such SR ${id}`,
        code: 1,
        data: { id, type: "SR" },
      },
    });
    return res.status(202).json({
      taskId: task.id,
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

  const task = createSuccessTask(dataStore, {
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

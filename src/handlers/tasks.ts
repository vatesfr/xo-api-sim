import type express from "express";
import type { MockDataStore } from "../data-store";
import { applyLimit, applyFilter, sendCollection } from "../utils";

export function registerTasksHandlers(
  app: express.Application,
  dataStore: MockDataStore,
) {
  app.get("/rest/v0/:resource/:id/tasks", (req, res) => {
    const item = dataStore.findById(req.params.resource, req.params.id);
    if (!item) {
      return res.status(404).json({
        error: `no such ${req.params.resource} ${req.params.id}`,
        data: { id: req.params.id, type: req.params.resource },
      });
    }
    const tasks = dataStore
      .getResource("tasks")
      .filter((t: any) => t.properties?.objectId === req.params.id);
    const filteredTasks = applyFilter(tasks, req);
    sendCollection(res, req, applyLimit(filteredTasks, req));
  });
}

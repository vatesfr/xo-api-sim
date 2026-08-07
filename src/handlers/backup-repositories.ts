import type express from "express";
import { v4 as uuid } from "uuid";
import type { MockDataStore } from "../data-store";
import type { CreateBackupRepositoryBody } from "../types";
import { CreateSuccessTask } from "../tasks";

export function registerBackupRepositoryHandlers(
  app: express.Application,
  dataStore: MockDataStore,
) {
  app.post("/rest/v0/backup-repositories", (req, res) => {
    const body = req.body as CreateBackupRepositoryBody;
    if (!body.name || !body.url)
      return res.status(400).json({
        error: `${!body.name ? "name" : "url"} is required`,
        data: { id: null, type: "backup-repository" },
      });
    const id = uuid();
    dataStore.addItem("backup-repositories", { ...body, id, type: "remote" });
    return res.status(201).json({ id });
  });
  app.patch("/rest/v0/backup-repositories/:id", (req, res) => {
    if (!dataStore.updateItem("backup-repositories", req.params.id, req.body))
      return res.status(404).json({
        error: `no such backup repository ${req.params.id}`,
        data: { id: req.params.id, type: "backup-repository" },
      });
    return res.status(204).send();
  });
  app.get("/rest/v0/backup-repositories/:id/health", (req, res) => {
    if (!dataStore.findById("backup-repositories", req.params.id))
      return res.status(404).json({
        error: `no such backup repository ${req.params.id}`,
        data: { id: req.params.id, type: "backup-repository" },
      });
    return res.json({ success: true });
  });
  app.post("/rest/v0/backup-repositories/:id/actions/:action", (req, res) => {
    const { id, action } = req.params;
    if (!dataStore.findById("backup-repositories", id))
      return res.status(404).json({
        error: `no such backup repository ${id}`,
        data: { id, type: "backup-repository" },
      });
    if (action === "forget") {
      dataStore.deleteItem("backup-repositories", id);
      return res.status(204).send();
    }
    if (action !== "benchmark")
      return res.status(400).json({
        error: `invalid action ${action}`,
        data: { id, type: "backup-repository" },
      });
    const result = {
      success: true,
      readRate: 8_000_000,
      writeRate: 8_000_000,
    };
    const task = CreateSuccessTask(dataStore, {
      objectType: "backup",
      objectId: id,
      name: "Backup repository benchmark",
      result,
    });
    return res.status(202).json({ taskId: task.id });
  });
}

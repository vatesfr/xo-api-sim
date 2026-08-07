import type express from "express";
import type { MockDataStore } from "../data-store";
import { CreateSuccessTask } from "../tasks";

const actions = new Set([
  "disable",
  "enable",
  "start",
  "clean_shutdown",
  "clean_reboot",
  "smart_reboot",
  "restart_toolstack",
  "emergency_shutdown",
  "detach",
  "forget",
]);

export function registerHostHandlers(
  app: express.Application,
  dataStore: MockDataStore,
) {
  app.post("/rest/v0/hosts/:id/actions/:action", (req, res, next) => {
    const { id, action } = req.params;
    const host = dataStore.findById("hosts", id);
    if (!actions.has(action)) return next();
    if (!host)
      return res.status(404).json({
        error: `no such HOST ${id}`,
        data: { id, type: "HOST" },
      });

    if (action === "disable")
      dataStore.updateItem("hosts", id, { enabled: false });
    if (action === "enable")
      dataStore.updateItem("hosts", id, { enabled: true });
    if (["clean_shutdown", "emergency_shutdown"].includes(action))
      dataStore.updateItem("hosts", id, { power_state: "Halted" });
    if (["start", "clean_reboot", "smart_reboot"].includes(action))
      dataStore.updateItem("hosts", id, { power_state: "Running" });
    if (action === "forget") dataStore.deleteItem("hosts", id);

    const task = CreateSuccessTask(dataStore, {
      objectType: "host",
      objectId: id,
      name: `Host ${action}`,
    });
    return res.status(202).json({ taskId: task.id });
  });
}

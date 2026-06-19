import { randomBytes } from "crypto";
import type { MockDataStore } from "./data-store";
import type { XoTask, Branded } from "./types";

export function generateTaskId(): Branded<"task"> {
  // Generate 9 random bytes (each byte is 2 hex characters)
  const bytes = randomBytes(5); // 5 bytes * 2 = 10 hex characters
  // Convert to hex and take the first 9 characters, prefixed with '0'
  return `0${bytes.toString("hex").slice(0, 9)}` as Branded<"task">;
}

export function createSuccessTask(dataStore: MockDataStore): XoTask {
  const taskId = generateTaskId();
  const task: XoTask = {
    id: taskId,
    status: "success",
    properties: {},
    start: new Date().getUTCMilliseconds(),
    end: new Date().getUTCMilliseconds(),
  };

  dataStore.addItem("tasks", task);
  return task;
}

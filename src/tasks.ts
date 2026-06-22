import { randomBytes } from "crypto";
import type { MockDataStore } from "./data-store";
import type { XoTask, Branded } from "./types";

function generateTaskId(): Branded<"task"> {
  // Generate 9 random bytes (each byte is 2 hex characters)
  const bytes = randomBytes(5); // 5 bytes * 2 = 10 hex characters
  // Convert to hex and take the first 9 characters, prefixed with '0'
  return `0${bytes.toString("hex").slice(0, 9)}` as Branded<"task">;
}

export interface CreateTaskOptions {
  status?: XoTask["status"];
  objectType: XoTask["properties"]["objectType"];
  objectId: string;
  name?: string;
  type?: string;
  userId?: string;
  result?: any;
}

export function CreateSuccessTask(
  dataStore: MockDataStore,
  options: CreateTaskOptions,
): XoTask {
  return createTask(dataStore, { ...options, status: "success" });
}

export function CreateFailedTask(
  dataStore: MockDataStore,
  options: CreateTaskOptions,
): XoTask {
  return createTask(dataStore, { ...options, status: "failure" });
}

function createTask(
  dataStore: MockDataStore,
  options: CreateTaskOptions,
): XoTask {
  const taskId = generateTaskId();
  const now = Date.now();
  const task: XoTask = {
    id: taskId,
    status: options.status || "pending",
    properties: {
      objectType: options.objectType,
      objectId: options.objectId,
      name: options.name,
      type: options.type ?? "xo:mock:action",
      userId: options.userId,
    },
    result: options.result,
    start: now,
    end: now,
  };

  dataStore.addItem("tasks", task);
  return task;
}

export function UpdateAllTasksForObject(
  dataStore: MockDataStore,
  objectType: string,
  objectId: string,
  updates: Partial<XoTask>,
): void {
  const tasks = dataStore
    .getResource("tasks")
    .filter(
      (task: XoTask) =>
        task.properties.objectType === objectType &&
        task.properties.objectId === objectId,
    );

  tasks.forEach((task: XoTask) => {
    dataStore.updateItem("tasks", task.id, updates);
  });
}

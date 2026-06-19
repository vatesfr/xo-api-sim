import type express from "express";
import type { MockDataStore } from "../data-store";
import { registerVdiHandlers } from "./vdis";
import { registerTagHandlers } from "./tags";

export function registerCustomHandlers(
  app: express.Application,
  dataStore: MockDataStore,
) {
  registerTagHandlers(app, dataStore);
  registerVdiHandlers(app, dataStore);
}

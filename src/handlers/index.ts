import type express from "express";
import type { MockDataStore } from "../data-store";
import { registerVdiHandlers } from "./vdis";

export function registerCustomHandlers(
  app: express.Application,
  dataStore: MockDataStore,
) {
  registerVdiHandlers(app, dataStore);
}

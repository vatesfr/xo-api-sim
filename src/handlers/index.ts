import type express from "express";
import type { MockDataStore } from "../data-store";
import { registerVdiHandlers } from "./vdis";
import { registerTagHandlers } from "./tags";
import { registerVifHandlers } from "./vifs";
import { registerPbdHandlers } from "./pbds";

export function registerCustomHandlers(
  app: express.Application,
  dataStore: MockDataStore,
) {
  registerTagHandlers(app, dataStore);
  registerVdiHandlers(app, dataStore);
  registerVifHandlers(app, dataStore);
  registerPbdHandlers(app, dataStore);
}

import type express from "express";
import type { MockDataStore } from "../data-store";
import type { MockAuthConfig } from "../auth";
import { registerAuthHandlers } from "./auth";
import { registerVdiHandlers } from "./vdis";
import { registerTagHandlers } from "./tags";
import { registerVifHandlers } from "./vifs";
import { registerPbdHandlers } from "./pbds";
import { registerTasksHandlers } from "./tasks";
import { registerSRHandlers } from "./srs";
import { registerPoolHandlers } from "./pools";
import { registerVbdHandlers } from "./vbds";
import { registerVmHandlers } from "./vms";
import { registerVmTemplateHandlers } from "./vm-templates";
import { registerEventHandlers } from "./events";
import { registerDashboardHandlers } from "./dashboard";

export function registerCustomHandlers(
  app: express.Application,
  dataStore: MockDataStore,
  authConfig: MockAuthConfig,
) {
  registerAuthHandlers(app, dataStore, authConfig);
  registerEventHandlers(app);
  registerDashboardHandlers(app);
  registerTagHandlers(app, dataStore);
  registerVdiHandlers(app, dataStore);
  registerVifHandlers(app, dataStore);
  registerPbdHandlers(app, dataStore);
  registerTasksHandlers(app, dataStore);
  registerSRHandlers(app, dataStore);
  registerPoolHandlers(app, dataStore);
  registerVbdHandlers(app, dataStore);
  registerVmHandlers(app, dataStore);
  registerVmTemplateHandlers(app, dataStore);
}

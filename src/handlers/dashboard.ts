import type express from "express";
import { sendObject } from "../utils";

/**
 * Dashboard endpoints consumed by the XO 6 web UI. The real XO computes these
 * aggregates server-side; the simulator has no aggregation layer, so it returns
 * an empty object. The UI's dashboard resources treat missing sections as
 * "no data" (each computed getter early-returns on `undefined`), so an empty
 * payload renders a clean, empty dashboard instead of an error state.
 *
 * These are registered as custom handlers (before the Swagger routes) because
 * `dashboard` is excluded from the generated CRUD routes and the per-object
 * variants would otherwise fall through to the generic sub-resource handler.
 */
export function registerDashboardHandlers(app: express.Application) {
  const emptyDashboard = (req: express.Request, res: express.Response) =>
    sendObject(res, req, {});

  app.get("/rest/v0/dashboard", emptyDashboard);
  app.get("/rest/v0/pools/:id/dashboard", emptyDashboard);
  app.get("/rest/v0/vms/:id/dashboard", emptyDashboard);
}

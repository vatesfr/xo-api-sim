import type express from "express";
import { v4 as uuid } from "uuid";
import swagger from "../../swagger.json";
import type { MockDataStore } from "../data-store";
import type { XoResourceType } from "../types";
import {
  applyLimit,
  applyFilter,
  applyFields,
  sendCollection,
  sendObject,
  sendObjects,
} from "../utils";

// Resources to exclude (special endpoints)
const EXCLUDED_RESOURCES = [
  "dashboard",
  "ping",
  "mcp",
  "events",
  "docs",
  "sms",
  "backup",
  "restore",
  "plugins",
];

// XO object type for each swagger resource (used in 404 payloads).
// The data store collection name is always the resource name itself.
const RESOURCE_TYPES: Record<string, XoResourceType> = {
  "gui-routes": "gui-route",
  vms: "VM",
  "vm-templates": "VM-template",
  "vm-snapshots": "VM-snapshot",
  "vm-controllers": "VM-controller",
  vifs: "VIF",
  vdis: "VDI",
  "vdi-snapshots": "VDI-snapshot",
  vbds: "VBD",
  users: "user",
  tasks: "task",
  srs: "SR",
  servers: "server",
  schedules: "schedule",
  "restore-logs": "restore-log",
  proxies: "proxy",
  pools: "pool",
  pifs: "PIF",
  pgpus: "PGPU",
  pcis: "PCI",
  pbds: "PBD",
  networks: "network",
  messages: "message",
  hosts: "host",
  groups: "group",
  "backup-repositories": "backup-repository",
  "backup-logs": "backup-log",
  "backup-jobs": "backup-job",
  "backup-archives": "backup-archive",
  alarms: "alarm",
  "acl-roles": "acl-role",
  "acl-privileges": "acl-privilege",
};

// Fail at startup if the swagger spec gains a resource we forgot to type.
function assertResourceTypes(paths: Record<string, unknown>) {
  for (const path of Object.keys(paths)) {
    const resourceName = getResourceName(path);
    if (
      resourceName &&
      !EXCLUDED_RESOURCES.includes(resourceName) &&
      !RESOURCE_TYPES[resourceName]
    ) {
      throw new Error(`Missing type for Swagger resource ${resourceName}`);
    }
  }
}

function sendNotFound(
  res: express.Response,
  objectType: XoResourceType,
  id: string,
) {
  return res.status(404).json({
    error: `no such ${objectType} ${id}`,
    data: { id, type: objectType },
  });
}

// Map swagger path params to express params
function mapPathParams(swaggerPath: string): string {
  return swaggerPath.replace(/\{([^{}]+)\}/g, ":$1");
}

// Extract resource name from path
function getResourceName(path: string): string | null {
  const match = /^\/([a-z][a-z0-9-]*)/.exec(path);
  return match ? match[1] : null;
}

// Register all routes from swagger spec
export function registerSwaggerRoutes(
  app: express.Application,
  dataStore: MockDataStore,
) {
  // Catch sub-resource endpoints (e.g., /rest/v0/srs/{id}/tasks) that weren't
  // handled by earlier route layers. This runs before swagger CRUD routes
  // to prevent them from treating sub-routes as main resource lookups.
  app.all("/rest/v0/:resource/:id/:subResource/:subId?", (req, res, _next) => {
    // GET sub-collections that lack a dedicated handler (alarms, messages, ...:
    // no fixture data exists for them) degrade gracefully to an empty result so
    // the web UI's detail pages render "no data" instead of erroring. Non-GET
    // verbs remain unimplemented.
    if (req.method === "GET") {
      console.log(
        `Sub-resource endpoint has no dedicated handler, returning empty: ${req.method} ${req.originalUrl}`,
      );
      return sendCollection(res, req, []);
    }
    console.log(
      `Sub-resource endpoint not yet implemented: ${req.method} ${req.originalUrl}`,
    );
    res.status(501).json({ error: "Not implemented" });
  });

  // Handle GET /{resource} - list all
  function handleList(
    req: express.Request,
    res: express.Response,
    resourceName: string,
  ) {
    let items = dataStore.getResource(resourceName);

    // Apply filter if present
    items = applyFilter(items, req);

    // Apply limit if present
    items = applyLimit(items, req);

    // Like XO: hrefs without `fields`, projected records with `href` otherwise,
    // in both JSON and NDJSON modes.
    sendObjects(res, req, items, `/rest/v0/${resourceName}`);
  }

  // Handle GET /{resource}/{id} - get by ID
  function handleGetById(
    req: express.Request,
    res: express.Response,
    resourceName: string,
  ) {
    const item = dataStore.findById(resourceName, req.params.id);

    if (!item) {
      return sendNotFound(res, RESOURCE_TYPES[resourceName], req.params.id);
    }

    sendObject(res, req, applyFields([item], req)[0]);
  }

  // Handle POST /{resource} - create
  function handleCreate(
    req: express.Request,
    res: express.Response,
    resourceName: string,
  ) {
    const { id: clientId, ...body } = req.body;
    if (clientId !== undefined) {
      console.warn(
        `[${req.method} ${req.originalUrl}] Client-supplied id "${clientId}" will be ignored, generating a new one`,
      );
    }
    const newItem = {
      ...body,
      id: uuid(),
    };
    const created = dataStore.addItem(resourceName, newItem);
    res.status(201).json(created);
  }

  // Handle PUT /{resource}/{id} - update
  function handleUpdate(
    req: express.Request,
    res: express.Response,
    resourceName: string,
  ) {
    const updated = dataStore.updateItem(resourceName, req.params.id, req.body);

    if (!updated) {
      return sendNotFound(res, RESOURCE_TYPES[resourceName], req.params.id);
    }

    res.json(updated);
  }

  // Handle DELETE /{resource}/{id} - delete
  function handleDelete(
    req: express.Request,
    res: express.Response,
    resourceName: string,
  ) {
    const deleted = dataStore.deleteItem(resourceName, req.params.id);

    if (!deleted) {
      return sendNotFound(res, RESOURCE_TYPES[resourceName], req.params.id);
    }

    res.json({ success: true });
  }

  // Handle POST /{resource}/{id}/actions/{action} - execute action
  function handleAction(
    req: express.Request,
    res: express.Response,
    resourceName: string,
  ) {
    const action = req.params.action;
    const id = req.params.id;

    console.log(
      `Action ${action} on ${resourceName} ${id} - not yet implemented`,
    );
    res.status(501).json({
      error: "Action not implemented",
      action,
      resourceId: id,
    });
  }
  const paths = (swagger as any).paths;
  const basePath = "/rest/v0";
  assertResourceTypes(paths);

  Object.entries(paths).forEach(([path, methods]: [string, any]) => {
    // Skip excluded resources
    const resourceName = getResourceName(path);
    if (resourceName && EXCLUDED_RESOURCES.includes(resourceName)) {
      return;
    }

    // Handle each HTTP method
    Object.entries(methods).forEach(([method, _operation]: [string, any]) => {
      if (["get", "post", "put", "patch", "delete"].includes(method)) {
        // Add the /rest/v0 prefix to all paths
        const expressPath = basePath + mapPathParams(path);

        // Determine handler based on path pattern
        const handler = (req: express.Request, res: express.Response) => {
          try {
            // Check if this is an action endpoint
            if (path.includes("/actions/")) {
              return handleAction(req, res, resourceName || "");
            }

            // Check if this is a stats endpoint
            if (path.includes("/stats")) {
              console.log(`Stats endpoint not yet implemented: ${path}`);
              return res.status(501).json({ error: "Stats not implemented" });
            }

            // Check if this is a download endpoint
            if (path.includes(".{format}")) {
              console.log(`Download endpoint not yet implemented: ${path}`);
              return res
                .status(501)
                .json({ error: "Download not implemented" });
            }

            // Standard CRUD operations
            if (method === "get" && !path.includes("{id}")) {
              return handleList(req, res, resourceName || "");
            }

            if (method === "get" && path.includes("{id}")) {
              return handleGetById(req, res, resourceName || "");
            }

            if (method === "post" && !path.includes("{id}")) {
              return handleCreate(req, res, resourceName || "");
            }

            if (
              (method === "put" || method === "patch") &&
              path.includes("{id}")
            ) {
              return handleUpdate(req, res, resourceName || "");
            }

            if (method === "delete" && path.includes("{id}")) {
              return handleDelete(req, res, resourceName || "");
            }

            // Default handler
            console.log(`No handler for ${method.toUpperCase()} ${path}`);
            res.status(501).json({ error: "Not implemented" });
          } catch (err) {
            console.error(
              `Error handling ${method.toUpperCase()} ${path}:`,
              err,
            );
            res.status(500).json({ error: "Internal server error" });
          }
        };

        // Register route
        app[method as keyof express.Application](expressPath, handler);
        console.log(`Registered ${method.toUpperCase()} ${expressPath}`);
      }
    });
  });

  console.log("Swagger routes registered with /rest/v0 prefix");
}

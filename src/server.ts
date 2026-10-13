import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swagger.json";
import type { MockDataStore } from "./data-store";
import type { MockAuthConfig } from "./auth";
import { loadAuthConfig } from "./auth";
import { authMiddleware } from "./middleware/auth-middleware";
import { registerCustomHandlers } from "./handlers";
import { registerSwaggerRoutes } from "./routes/swagger-routes";

export async function startServer(
  port: number,
  dataStore: MockDataStore,
  authConfig: MockAuthConfig = loadAuthConfig(),
) {
  const app = express();

  // Middleware
  app.use(express.json());

  // Optional token enforcement (no-op unless MOCK_AUTH_ENFORCE=true).
  app.use(authMiddleware(dataStore, authConfig));

  // HTTP request tracing
  app.use((_req, _res, next) => {
    const start = Date.now();
    const origEnd = _res.end;
    _res.end = ((chunk?: any, encoding?: any) => {
      const duration = Date.now() - start;
      const req = _req as express.Request;
      console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${_res.statusCode} (${duration}ms)`,
      );
      return origEnd.call(_res, chunk, encoding);
    }) as typeof _res.end;
    next();
  });

  // Swagger UI (swagger.json already has servers: [{url: '/rest/v0'}])
  // @types/swagger-ui-express bundles express 5 types; cast to this app's express 4 handlers.
  const swaggerServe = swaggerUi.serve as unknown as express.RequestHandler[];
  const swaggerSetup = swaggerUi.setup(
    swaggerSpec as any,
  ) as unknown as express.RequestHandler;
  app.use("/docs", ...swaggerServe, swaggerSetup);
  app.get("/swagger.json", (_req, res) => res.json(swaggerSpec));

  // Basic route for testing
  app.get("/ping", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Register custom handlers before swagger routes so they win matching.
  registerCustomHandlers(app, dataStore, authConfig);

  // Register all swagger routes
  registerSwaggerRoutes(app, dataStore);

  // Error handling middleware
  app.use(
    (
      err: Error,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      console.error("Unhandled error:", err);
      res.status(500).json({ error: "Internal server error" });
    },
  );

  console.log("Server configured with swagger routes");
  console.log(
    `Auth: issuing tokens at POST /rest/v0/users/me/authentication_tokens ` +
      `(credentials: ${authConfig.allowAny ? "any accepted" : [...authConfig.credentials.keys()].join(", ") || "none"}, ` +
      `enforce: ${authConfig.enforce})`,
  );
  if (authConfig.enforce && authConfig.staticTokenIsDefault) {
    console.warn(
      `WARNING: auth is enforced but AUTH_TOKEN is unset, so the well-known ` +
        `static token "${authConfig.staticToken}" grants admin access. ` +
        `Set AUTH_TOKEN to a secret value before exposing this server.`,
    );
  }

  // Start the server
  return new Promise<void>((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      resolve();
    });

    server.on("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        console.error(`Port ${port} is already in use`);
      } else {
        console.error("Server error:", err);
      }
      reject(err);
    });
  });
}

import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swagger.json";
import type { MockDataStore } from "./data-store";
import { registerCustomHandlers } from "./handlers";
import { registerSwaggerRoutes } from "./routes/swagger-routes";

export async function startServer(port: number, dataStore: MockDataStore) {
  const app = express();

  // Middleware
  app.use(express.json());

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
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec as any));
  app.get("/swagger.json", (_req, res) => res.json(swaggerSpec));

  // Basic route for testing
  app.get("/ping", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Register custom handlers before swagger routes so they win matching.
  registerCustomHandlers(app, dataStore);

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

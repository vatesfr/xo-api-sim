import type express from "express";
import type { MockDataStore } from "../data-store";
import type { MockAuthConfig } from "../auth";
import { authenticateRequest } from "../auth";

/**
 * Optional authentication enforcement for `/rest/v0/*`.
 *
 * Enabled with `MOCK_AUTH_ENFORCE=true`. When on, every REST request must
 * authenticate like on a real XO: an `authenticationToken` (or `token`) cookie,
 * or HTTP basic credentials, but not both. Bearer headers are rejected. The
 * login endpoints stay reachable, and the resolved user is attached as
 * `req.user` for downstream handlers.
 *
 * When off (the default), this is a no-op so Swagger UI, curl, and the existing
 * unauthenticated dev workflow keep working.
 */
export function authMiddleware(
  dataStore: MockDataStore,
  config: MockAuthConfig,
): express.RequestHandler {
  return (req, res, next) => {
    if (!config.enforce) return next();

    const path = req.path;

    // Only guard the REST surface.
    if (!path.startsWith("/rest/v0")) return next();

    // Login must stay reachable without a token.
    if (req.method === "POST" && path.endsWith("/authentication_tokens")) {
      return next();
    }

    const result = authenticateRequest(req, dataStore, config);
    if ("status" in result) {
      return res.status(result.status).json({ error: result.error });
    }
    if (!result.user) {
      return res.status(401).json({ error: "invalid credentials" });
    }

    (req as express.Request & { user?: unknown }).user = result.user;
    next();
  };
}

import type express from "express";
import type { MockDataStore } from "../data-store";
import type { MockAuthConfig } from "../auth";
import { authenticateToken, extractToken } from "../auth";

/**
 * Optional bearer-token enforcement for `/rest/v0/*`.
 *
 * Enabled with `MOCK_AUTH_ENFORCE=true`. When on, every REST request must carry
 * a valid `authenticationToken` cookie (or `Authorization` bearer/token header),
 * except the login endpoints themselves. The resolved user is attached as
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

    const token = extractToken(req);
    const user = token ? authenticateToken(dataStore, token, Date.now()) : null;

    if (!user) {
      return res.status(401).json({
        error: "authentication required",
        data: { id: null, type: "user" },
      });
    }

    (req as express.Request & { user?: unknown }).user = user;
    next();
  };
}

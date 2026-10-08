import type express from "express";
import type { MockDataStore } from "../data-store";
import type { MockAuthConfig } from "../auth";
import {
  TOKENS_COLLECTION,
  authenticateRequest,
  extractToken,
  issueToken,
  resolveLoginUser,
} from "../auth";
import type { XoAuthenticationToken, XoUser } from "../types";
import { applyFilter, applyLimit } from "../utils";

/**
 * Auth endpoints for XO's token login flow:
 *
 * - `POST /users/:id/authentication_tokens` — HTTP Basic login, returns 201
 *   `{ token: { id, ... } }`. `:id` must be `me` or the user's own id. Also
 *   mounted under `/users/authentication_tokens` (deprecated form).
 * - `GET  /users/me` — the current user for the presented token.
 * - `GET  /users/:id/authentication_tokens` — the user's own tokens (`me` or
 *   their id).
 * - `DELETE /users/me/authentication_tokens/:id` — revoke a token (logout).
 *   Simulator extension: not part of the XO OpenAPI contract.
 */
export function registerAuthHandlers(
  app: express.Application,
  dataStore: MockDataStore,
  config: MockAuthConfig,
) {
  // Like XO, the token is created for the authenticated user, whichever
  // method (basic credentials or a token cookie) authenticated the request.
  const createToken = (req: express.Request, res: express.Response) => {
    const result = authenticateRequest(req, dataStore, config);
    if ("status" in result) {
      return res.status(result.status).json({ error: result.error });
    }
    const { user } = result;
    if (!user) {
      return res.status(401).json({ error: "invalid credentials" });
    }

    const pathId = req.params.id;
    if (pathId !== undefined && pathId !== "me" && pathId !== user.id) {
      return res
        .status(403)
        .json(
          forbiddenOperation(
            "create authentication token",
            "you can only create token for yourself",
          ),
        );
    }

    const body = (req.body ?? {}) as {
      description?: string;
      client?: { id: string };
    };
    const token = issueToken(dataStore, config, {
      user,
      description: body.description,
      client: body.client,
      now: Date.now(),
    });

    return res.status(201).json({ token });
  };

  app.post("/rest/v0/users/authentication_tokens", createToken);
  app.post("/rest/v0/users/:id/authentication_tokens", createToken);

  // Current user for the presented token.
  app.get("/rest/v0/users/me", (req, res) => {
    const result = resolveRequestUser(req, dataStore, config);
    if ("status" in result) {
      return res.status(result.status).json({ error: result.error });
    }
    res.json(result.user);
  });

  // "You can only see your own authentication tokens."
  app.get("/rest/v0/users/:id/authentication_tokens", (req, res) => {
    const result = resolveRequestUser(req, dataStore, config);
    if ("status" in result) {
      return res.status(result.status).json({ error: result.error });
    }
    const { user } = result;
    const userId = req.params.id === "me" ? user.id : req.params.id;
    if (!dataStore.findById("users", userId)) {
      return res.status(404).json({
        error: `no such user ${userId}`,
        data: { id: userId, type: "user" },
      });
    }
    if (userId !== user.id) {
      return res
        .status(403)
        .json(
          forbiddenOperation(
            "get authentication tokens",
            "can only see own authentication tokens",
          ),
        );
    }
    // Like XO, expired tokens are not listed.
    const now = Date.now();
    const tokens = dataStore
      .getResource(TOKENS_COLLECTION)
      .filter(
        (t: XoAuthenticationToken) =>
          t.user_id === user.id && !(t.expiration < now),
      );
    res.json(applyLimit(applyFilter(tokens, req), req));
  });

  // Revoke a token (logout).
  app.delete("/rest/v0/users/me/authentication_tokens/:id", (req, res) => {
    const result = resolveRequestUser(req, dataStore, config);
    if ("status" in result) {
      return res.status(result.status).json({ error: result.error });
    }
    const { user } = result;
    const token = dataStore.findById(TOKENS_COLLECTION, req.params.id) as
      | XoAuthenticationToken
      | undefined;
    // Only the token owner (or an admin) may revoke; 404 otherwise to avoid
    // leaking token existence.
    if (!token || (token.user_id !== user.id && user.permission !== "admin")) {
      return res.status(404).json({
        error: `no such authentication token ${req.params.id}`,
        data: { id: req.params.id, type: "authentication-token" },
      });
    }
    dataStore.deleteItem(TOKENS_COLLECTION, req.params.id);
    res.json({ success: true });
  });
}

/**
 * Resolves the user for the `/users/me` endpoints.
 *
 * Explicit failures from `authenticateRequest` (e.g. 400 for a cookie plus an
 * `Authorization` header) are returned as-is, with one accept-any exception:
 * the XO 6 web UI stores an opaque XO 5 token (pasted into its `/dev/token`
 * page) that the simulator never issued, so it won't resolve to a stored token.
 * Such requests, and requests without credentials, are bound to the default
 * admin, matching how logins resolve, so the web UI's account panel works
 * without a real login round-trip.
 */
function resolveRequestUser(
  req: express.Request,
  dataStore: MockDataStore,
  config: MockAuthConfig,
): { user: XoUser } | { status: 400 | 401; error: string } {
  const result = authenticateRequest(req, dataStore, config);
  if ("user" in result && result.user) {
    return { user: result.user };
  }

  const unknownToken =
    "status" in result && result.status === 401 && extractToken(req) !== null;
  if (config.allowAny && ("user" in result || unknownToken)) {
    const user = resolveLoginUser(dataStore, "");
    if (user) return { user };
  }

  return "status" in result
    ? result
    : { status: 401, error: "invalid credentials" };
}

/** XO's `forbiddenOperation` API error body (`xo-common/api-errors`). */
function forbiddenOperation(operation: string, reason: string) {
  return {
    error: `forbidden operation: ${operation}`,
    data: { operation, reason },
  };
}

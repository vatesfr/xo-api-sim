import type express from "express";
import type { MockDataStore } from "../data-store";
import type { MockAuthConfig } from "../auth";
import {
  TOKENS_COLLECTION,
  authenticateRequest,
  issueToken,
  parseBasicAuth,
  resolveLoginUser,
  verifyCredentials,
} from "../auth";
import type { XoAuthenticationToken } from "../types";

/**
 * Auth endpoints for XO's token login flow:
 *
 * - `POST /users/me/authentication_tokens` — HTTP Basic login, returns
 *   `{ token: { id, ... } }`. Also mounted under `/users/authentication_tokens`
 *   (deprecated form) and `/users/:id/authentication_tokens`.
 * - `GET  /users/me` — the current user for the presented token.
 * - `GET  /users/me/authentication_tokens` — tokens owned by the current user.
 * - `DELETE /users/me/authentication_tokens/:id` — revoke a token (logout).
 */
export function registerAuthHandlers(
  app: express.Application,
  dataStore: MockDataStore,
  config: MockAuthConfig,
) {
  const createToken = (req: express.Request, res: express.Response) => {
    const creds = parseBasicAuth(req.headers.authorization);
    if (!creds) {
      return res.status(401).json({
        error: "authentication credentials are missing",
        data: { id: null, type: "user" },
      });
    }

    if (!verifyCredentials(config, creds.username, creds.password)) {
      return res.status(401).json({
        error: "invalid credentials",
        data: { id: null, type: "user" },
      });
    }

    const user = resolveLoginUser(dataStore, creds.username);
    if (!user) {
      return res.status(401).json({
        error: `no such user ${creds.username}`,
        data: { id: null, type: "user" },
      });
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

    return res.status(200).json({ token });
  };

  app.post("/rest/v0/users/me/authentication_tokens", createToken);
  app.post("/rest/v0/users/authentication_tokens", createToken);
  app.post("/rest/v0/users/:id/authentication_tokens", createToken);

  // Current user for the presented token.
  //
  // The XO 6 web UI stores an opaque XO 5 token (pasted into its `/dev/token`
  // page) that the simulator never issued, so it won't resolve to a stored
  // token. In accept-any mode we bind such requests to the default admin user,
  // matching how `issueToken` resolves logins — this keeps the web UI's account
  // panel populated without a real login round-trip.
  app.get("/rest/v0/users/me", (req, res) => {
    let user = currentUser(req, dataStore, config);
    if (!user && config.allowAny) {
      user = resolveLoginUser(dataStore, "") ?? null;
    }
    if (!user) {
      return res.status(401).json({ error: "invalid credentials" });
    }
    res.json(user);
  });

  // Tokens owned by the current user.
  app.get("/rest/v0/users/me/authentication_tokens", (req, res) => {
    const user = currentUser(req, dataStore, config);
    if (!user) {
      return res.status(401).json({ error: "invalid credentials" });
    }
    const tokens = dataStore
      .getResource(TOKENS_COLLECTION)
      .filter((t: XoAuthenticationToken) => t.user_id === user.id);
    res.json(tokens);
  });

  // Revoke a token (logout).
  app.delete("/rest/v0/users/me/authentication_tokens/:id", (req, res) => {
    const user = currentUser(req, dataStore, config);
    if (!user) {
      return res.status(401).json({ error: "invalid credentials" });
    }
    const deleted = dataStore.deleteItem(TOKENS_COLLECTION, req.params.id);
    if (!deleted) {
      return res.status(404).json({
        error: `no such authentication token ${req.params.id}`,
        data: { id: req.params.id, type: "authentication-token" },
      });
    }
    res.json({ success: true });
  });
}

function currentUser(
  req: express.Request,
  dataStore: MockDataStore,
  config: MockAuthConfig,
) {
  const result = authenticateRequest(req, dataStore, config);
  return "user" in result ? result.user : null;
}

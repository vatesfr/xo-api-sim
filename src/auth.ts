import { randomBytes } from "crypto";
import type express from "express";
import type { MockDataStore } from "./data-store";
import type { XoAuthenticationToken, XoUser } from "./types";

const TOKENS_COLLECTION = "authentication_tokens";

export interface MockAuthConfig {
  /** Reject unauthenticated requests to `/rest/v0/*` (default: false). */
  enforce: boolean;
  /** Accept any username/password pair (default: true, dev-friendly). */
  allowAny: boolean;
  /** Explicit `username -> password` pairs accepted when `allowAny` is false. */
  credentials: Map<string, string>;
  /** Token lifetime in milliseconds. */
  tokenTtlMs: number;
}

/**
 * Reads the auth configuration from the environment.
 *
 * - `MOCK_AUTH_CREDENTIALS="admin:admin,operator:secret"` — explicit pairs.
 *   Setting it flips `allowAny` off unless `MOCK_AUTH_ANY=true` is also set.
 * - `MOCK_AUTH_ANY=true|false` — force accept-any on/off.
 * - `MOCK_AUTH_ENFORCE=true` — require a valid token on `/rest/v0/*`.
 * - `MOCK_AUTH_TOKEN_TTL=<seconds>` — token lifetime (default 7 days).
 */
export function loadAuthConfig(
  env: NodeJS.ProcessEnv = process.env,
): MockAuthConfig {
  const credentials = new Map<string, string>();
  if (env.MOCK_AUTH_CREDENTIALS) {
    for (const pair of env.MOCK_AUTH_CREDENTIALS.split(",")) {
      const idx = pair.indexOf(":");
      if (idx === -1) continue;
      const user = pair.slice(0, idx).trim();
      const pass = pair.slice(idx + 1).trim();
      if (user) credentials.set(user, pass);
    }
  }

  // Default: accept anything (mirrors how the old proxy shim behaved). Providing
  // an explicit credential list opts into real checking unless overridden.
  let allowAny = credentials.size === 0;
  if (env.MOCK_AUTH_ANY !== undefined) {
    allowAny = env.MOCK_AUTH_ANY === "true";
  }

  const ttlSeconds = env.MOCK_AUTH_TOKEN_TTL
    ? parseInt(env.MOCK_AUTH_TOKEN_TTL, 10)
    : 7 * 24 * 60 * 60;

  return {
    enforce: env.MOCK_AUTH_ENFORCE === "true",
    allowAny,
    credentials,
    tokenTtlMs: (Number.isFinite(ttlSeconds) ? ttlSeconds : 604800) * 1000,
  };
}

/** Decodes an `Authorization: Basic base64(user:pass)` header. */
export function parseBasicAuth(
  header: string | undefined,
): { username: string; password: string } | null {
  if (!header || !header.startsWith("Basic ")) return null;
  let decoded: string;
  try {
    decoded = Buffer.from(header.slice(6).trim(), "base64").toString("utf-8");
  } catch {
    return null;
  }
  const idx = decoded.indexOf(":");
  if (idx === -1) return null;
  return { username: decoded.slice(0, idx), password: decoded.slice(idx + 1) };
}

/**
 * Extracts the bearer token from a request. XO accepts either an
 * `authenticationToken` cookie or an `Authorization` header (`Bearer <t>` or
 * `token <t>`); the Flutter client sends the `authenticationToken` cookie and
 * the XO 6 web UI (its `/dev/token` page) sends a `token` cookie.
 */
export function extractToken(req: express.Request): string | null {
  const cookie = req.headers.cookie;
  if (cookie) {
    const match = cookie.match(
      /(?:^|;\s*)(?:authenticationToken|token)=([^;]+)/,
    );
    if (match) return decodeURIComponent(match[1]);
  }
  const auth = req.headers.authorization;
  if (auth) {
    const m = auth.match(/^(?:Bearer|token)\s+(.+)$/i);
    if (m) return m[1].trim();
  }
  return null;
}

/** Validates credentials against the configured policy. */
export function verifyCredentials(
  config: MockAuthConfig,
  username: string,
  password: string,
): boolean {
  if (!username) return false;
  if (config.allowAny) return true;
  return config.credentials.get(username) === password;
}

function findUserByName(
  dataStore: MockDataStore,
  username: string,
): XoUser | undefined {
  return dataStore
    .getResource("users")
    .find((u: XoUser) => u.name === username);
}

/**
 * Resolves the user a login should be bound to: the fixture user whose name
 * matches, falling back to the first admin (dev "accept anything" mode).
 */
export function resolveLoginUser(
  dataStore: MockDataStore,
  username: string,
): XoUser | undefined {
  return (
    findUserByName(dataStore, username) ??
    dataStore
      .getResource("users")
      .find((u: XoUser) => u.permission === "admin") ??
    dataStore.getResource("users")[0]
  );
}

/** Creates, stores, and returns a fresh authentication token. */
export function issueToken(
  dataStore: MockDataStore,
  config: MockAuthConfig,
  options: {
    user: XoUser;
    description?: string;
    client?: { id: string };
    now: number;
  },
): XoAuthenticationToken {
  const id = randomBytes(32).toString("base64url");
  const token: XoAuthenticationToken = {
    id,
    user_id: options.user.id,
    created_at: options.now,
    expiration: options.now + config.tokenTtlMs,
    description: options.description ?? "XO API Simulator token",
    client: options.client ?? { id: "xo-api-sim" },
    last_uses: {},
  } as XoAuthenticationToken;

  dataStore.addItem(TOKENS_COLLECTION, token);
  return token;
}

/**
 * Looks up a token and returns the associated user, or null when the token is
 * unknown or expired (expired tokens are evicted).
 */
export function authenticateToken(
  dataStore: MockDataStore,
  token: string,
  now: number,
): XoUser | null {
  const record = dataStore.findById(TOKENS_COLLECTION, token) as
    | XoAuthenticationToken
    | undefined;
  if (!record) return null;
  if (typeof record.expiration === "number" && record.expiration < now) {
    dataStore.deleteItem(TOKENS_COLLECTION, token);
    return null;
  }
  const user = dataStore.findById("users", record.user_id) as
    | XoUser
    | undefined;
  return user ?? null;
}

export { TOKENS_COLLECTION };

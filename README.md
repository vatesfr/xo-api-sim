# 🎭 XO API Simulator

Simulates the Xen Orchestra REST API for testing and development. At startup it loads fixtures, enriches them from the Swagger schema, then registers the OpenAPI routes under `/rest/v0/` plus custom handlers for endpoints that need special logic.

Swagger UI is available at `/docs/`. The raw spec is at `/swagger.json`.

## 🚀 Getting Started

```bash
npm install
npm start
```

The server listens on `http://localhost:3001` by default. Override with `PORT`. Override fixture loading with `FIXTURES_DIR`.

## Using the mock with the XO 6 web frontend

The new Vue.js frontend lives at `@xen-orchestra/web` in the
[`xen-orchestra`](https://github.com/vatesfr/xen-orchestra) monorepo. It talks to
the backend entirely over the REST API (`/rest/v0/*`): collections are streamed
as **NDJSON**, and live updates come over a **Server-Sent Events** channel at
`/rest/v0/events`. The simulator implements all of this, so you can develop the
UI without a real XO instance.

### 1. Start the simulator

```bash
# in xo-api-sim
npm install
npm start           # http://localhost:3001
```

### 2. Point the frontend at it

The frontend's Vite dev server proxies `/rest` (and the `/api` console
websocket) to `VITE_XO_REST_HOST`.

```bash
# in xen-orchestra/@xen-orchestra/web
yarn
cp .env.dist .env
```

Set the host in `.env` to wherever the simulator is listening:

```dotenv
VITE_XO_REST_HOST=localhost:3001
```

Then start it:

```bash
yarn dev            # http://localhost:5173
```

### 3. Register a token

The frontend gates authenticated requests on a `token` cookie. Open
[http://localhost:5173/#/dev/token](http://localhost:5173/#/dev/token) and paste
**any** non-empty value — in the simulator's default _accept-any_ auth mode the
token is not validated, and `/rest/v0/users/me` resolves to the default `admin`
fixture user. The page stores the cookie and reloads; the UI then lists the
fixture VMs, hosts, pools, SRs, networks, and so on.

> Keep `MOCK_AUTH_ENFORCE` **unset** (the default) when working with the web UI.
> Enforcement would reject the opaque dev token, and because the SSE handshake
> must succeed _before_ a watched collection loads, nothing would appear.

### How the frontend talks to the mock

| Concern       | Endpoint(s)                                                                        | Notes                                                                                               |
| ------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Collections   | `GET /rest/v0/{resource}?fields=…&ndjson=true`                                     | One JSON object per line (`application/x-ndjson`).                                                  |
| Live updates  | `GET /rest/v0/events` (SSE)                                                        | Emits `init` (carries the SSE id), then periodic `ping`.                                            |
| Subscriptions | `POST /rest/v0/events/:sseId/subscriptions` → `{ id }`, `DELETE …/:subscriptionId` | The UI subscribes per collection; the handshake must complete before the initial NDJSON fetch runs. |
| Current user  | `GET /rest/v0/users/me`                                                            | Returns the default admin in accept-any mode.                                                       |
| Dashboards    | `GET /rest/v0/dashboard`, `…/pools/:id/dashboard`, `…/vms/:id/dashboard`           | Return an empty object (the simulator has no aggregation layer); the UI renders an empty dashboard. |

Because fixtures are static, the simulator never pushes `add`/`update`/`remove`
events — the SSE channel exists to unblock the subscription handshake and report
liveness. Sub-collections without fixture-backed relationships (e.g. a VM's
alarms) return an empty NDJSON list rather than an error, so detail pages render
cleanly.

## 🔌 API Usage

Generic Swagger CRUD is still used for most resources:

```text
GET    /rest/v0/{resource}          list
GET    /rest/v0/{resource}/{id}     get by ID
POST   /rest/v0/{resource}          create
PUT    /rest/v0/{resource}/{id}     update
PATCH  /rest/v0/{resource}/{id}     update
DELETE /rest/v0/{resource}/{id}     delete
```

List endpoints accept `?fields=a,b,c` to project fields, `?filter=` (complex-matcher
syntax) to filter, and `?limit=` to cap results. With no `fields`, a list returns
an array of resource URIs. Add `?ndjson=true` to stream the records as
newline-delimited JSON (`application/x-ndjson`) — this is the form the XO 6 web UI
uses.

Custom handlers currently exist for:

- `GET /rest/v0/events` plus `POST`/`DELETE /rest/v0/events/:sseId/subscriptions/…` (SSE channel used by the XO 6 web UI)
- `GET /rest/v0/dashboard`, `GET /rest/v0/pools/:id/dashboard`, `GET /rest/v0/vms/:id/dashboard`
- `POST /rest/v0/users/me/authentication_tokens` (login) and related token endpoints
- `POST /rest/v0/vdis`
- `POST /rest/v0/vifs`
- `POST /rest/v0/vbds`
- `POST /rest/v0/pools/:id/actions/create_vm`
- `POST /rest/v0/vms/:id/actions/:action`
- `DELETE /rest/v0/vm-templates/:id` (deletes the template's disks; default templates are refused with `409`)
- `GET /rest/v0/vm-templates/:id.:format` (fake `xva`/`ova` export)
- `POST /rest/v0/vbds/:id/actions/:action`
- `POST /rest/v0/pbds/:id/actions/:action`
- `POST /rest/v0/srs/:id/actions/:action`
- tag add/remove endpoints for taggable resources
- `GET /rest/v0/:resource/:id/tasks`

## Authentication

The simulator implements XO's token auth so clients
can run their real login flow against it.

```text
POST   /rest/v0/users/me/authentication_tokens   HTTP Basic login -> 201 { token: { id, ... } }
GET    /rest/v0/users/me                          current user for the presented token
GET    /rest/v0/users/me/authentication_tokens    tokens owned by the current user
DELETE /rest/v0/users/me/authentication_tokens/:id revoke a token (logout; simulator extension)
```

Log in with an `Authorization: Basic base64(user:pass)` header; the returned
`token.id` is then sent back as an `authenticationToken` (or `token`) cookie.

As on a real XO, every `/rest/v0/*` request authenticates with either a token
cookie or HTTP Basic credentials:

- `Authorization: Bearer <token>` is **not** supported (it is decoded as basic
  credentials and fails with `401 invalid credentials`);
- sending a cookie and an `Authorization` header together answers `400`;
- an `Authorization` header with no payload answers `400 Malformed Authorization header`.

By default **any** username/password is accepted (dev-friendly) and requests are
**not** required to be authenticated. Configure via env vars:

| Variable                | Default                       | Effect                                                                                                            |
| ----------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `MOCK_AUTH_CREDENTIALS` | —                             | Comma-separated `user:pass` pairs to accept, e.g. `admin:admin,operator:secret`. Setting it turns off accept-any. |
| `MOCK_AUTH_ANY`         | `true` unless credentials set | Force accept-any on/off.                                                                                          |
| `MOCK_AUTH_ENFORCE`     | `false`                       | Require a valid token cookie or basic credentials on every `/rest/v0/*` request (login stays open).               |
| `MOCK_AUTH_TOKEN_TTL`   | `604800`                      | Token lifetime in seconds; non-positive or invalid values fall back to the default.                               |
| `AUTH_TOKEN`            | `test-token`                  | Static token always accepted as a cookie, bound to the default admin. Set it to a secret when enforcing auth.     |

Users come from `src/fixtures/users.json` (a default `admin` and `operator`);
issued tokens bind to the matching user, or to the first admin in accept-any
mode.

## 🧪 Fixtures

Fixtures are loaded from `src/fixtures/*.json` and merged by collection name. `enrichFixtures()` fills in defaults from the OpenAPI schema and computed fields used by the handlers.

To add static fixtures:

1. Add a JSON file in `src/fixtures/` named after the collection, for example `hosts.json`.
2. Use an array of objects, or an object whose array values will be merged by key.
3. Include at least `id` and `type` where required by the resource.

## 🛠 Custom Handlers

When an endpoint needs custom behavior, follow the existing pattern in `src/handlers/`:

1. Mirror the real Xen Orchestra controller types in `src/types.ts` using `Parameters<Xapi['METHOD_NAME']>`.
2. Add the handler in `src/handlers/<resource>.ts`.
3. Register it from `src/handlers/index.ts` so it runs before the generic Swagger router.
4. Match the existing validation style: `400` for missing required fields, `404` for missing referenced resources, `201` for successful creates, `202` for async task actions, and consistent `{ error, data }` payloads.

## 🐳 Docker

```bash
npm run docker:build
docker run -p 3001:3001 xo-api-simulator:latest
```

Or:

```bash
docker run -p 8080:3001 -e PORT=8080 xo-api-simulator:latest
```

## 📜 License

This project is licensed under the [GNU Affero General Public License v3](LICENSE).

Copyright (C) 2026 VATES SAS

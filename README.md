# 🎭 XO API Simulator

Simulates the Xen Orchestra REST API for testing and development. At startup it loads fixtures, enriches them from the Swagger schema, then registers the OpenAPI routes under `/rest/v0/` plus custom handlers for endpoints that need special logic.

Swagger UI is available at `/docs/`. The raw spec is at `/swagger.json`.

## 🚀 Getting Started

```bash
npm install
npm start
```

The server listens on `http://localhost:3001` by default. Override with `PORT`. Override fixture loading with `FIXTURES_DIR`.

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

Custom handlers currently exist for:

- `POST /rest/v0/vdis`
- `POST /rest/v0/vifs`
- `POST /rest/v0/vbds`
- `POST /rest/v0/pools/:id/actions/create_vm`
- `POST /rest/v0/vms/:id/actions/:action`
- `POST /rest/v0/vbds/:id/actions/:action`
- `POST /rest/v0/pbds/:id/actions/:action`
- `POST /rest/v0/srs/:id/actions/:action`
- tag add/remove endpoints for taggable resources
- `GET /rest/v0/:resource/:id/tasks`

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

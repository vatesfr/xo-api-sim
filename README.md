# Fake XO API Mock Server

Mock REST API server for Xen Orchestra. Routes are auto-generated from the OpenAPI spec (`swagger.json`) at startup — all 205 paths are registered under `/rest/v0/` with generic CRUD handlers backed by an in-memory data store.

Swagger UI available at `/docs/` for interactive exploration.

## Getting Started

```bash
npm install
npm start
```

Server runs on `http://localhost:3001` (override with `PORT` env var).

## API Usage

```
GET    /rest/v0/{resource}          → list (URIs without ?fields, objects with ?fields)
GET    /rest/v0/{resource}/{id}     → get by ID
POST   /rest/v0/{resource}          → create
PATCH  /rest/v0/{resource}/{id}     → update
DELETE /rest/v0/{resource}/{id}     → delete
```

- No `?fields` → returns array of resource URIs: `["/rest/v0/vms/{id}", ...]`
- `?fields=id,name_label` → returns only those fields
- `?fields=*` → returns all fields
- Resource IDs are UUIDs (except tasks)

## Updating Routes

Replace `swagger.json` and restart the server — routes are auto-discovered from the spec at startup.

## Data

Mock objects are created from `@vates/types` types for accurate field names. Add fixtures in `src/fixtures/` or edit `src/data-store.ts` to seed more data.

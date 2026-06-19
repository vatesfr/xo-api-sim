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

## Adding Static Fixtures

1. Add a new JSON file named after your resource (e.g., `src/fixtures/hosts.json`) with an array of objects
2. Objects must include at minimum:
   - `id`: UUID string
   - `type`: resource type (e.g., "host")
   - Other required fields
3. The server auto-loads all `.json` files in `src/fixtures/` at startup

## Enriching Fixtures

The `enrichFixtures()` function adds computed fields (like `$pool`, `current_operations`) and fills missing values from the Swagger schema:

- Default values: Missing fields are populated from the OpenAPI spec

To add enrichment logic:
1. Edit `src/fixtures/enrich-fixtures.ts`
2. Extend the `applySwaggerDefaults()` or add new enrichment functions

## Writing Custom Route Handlers

For endpoints requiring special logic (like `POST /vdis`):

1. Define the request body type in `src/types.ts` (mirroring the XenOrchestra server code):
   ```ts
   export type CreateVdiBody = {
     name: string;
     size: number;
     srId: string;
   }
   ```

2. Create handler in `src/handlers/[resource].ts`:
   ```ts
   export function registerVdiHandlers(app, dataStore) {
     app.post('/rest/v0/vdis', (req, res) => createVdi(req, res, dataStore))
   }
   ```

3. Register in `src/handlers/index.ts`:
   ```ts
   export function registerCustomHandlers(app, dataStore) {
     registerVdiHandlers(app, dataStore)
   }
   ```

4. Implement your logic following the established validation/response patterns

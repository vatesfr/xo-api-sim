# XO API Simulator — Architecture

```mermaid
sequenceDiagram
  participant Main as src/index.ts
  participant Fixtures as src/fixtures/*
  participant Store as MockDataStore
  participant Server as src/server.ts
  participant Handlers as src/handlers/*
  participant Routes as src/routes/swagger-routes.ts
  participant Express as Express app

  Main->>Fixtures: Load fixtures from src/fixtures/*.json
  Fixtures-->>Main: Raw fixture collections
  Main->>Fixtures: Enrich with OpenAPI defaults
  Fixtures-->>Main: Enriched fixtures
  Main->>Store: Create in-memory MockDataStore
  Main->>Server: Start server

  Server->>Express: Mount /docs, /swagger.json, /ping
  Server->>Handlers: Register custom handlers first
  Handlers-->>Express: POST /vdis, /vifs, /vbds
  Handlers-->>Express: Pool VM create action
  Handlers-->>Express: VM / VBD / PBD / SR actions
  Handlers-->>Express: Tag endpoints
  Handlers-->>Express: Task sub-resource lookup
  Server->>Routes: Register swagger routes
  Routes-->>Express: Register Swagger routes from swagger.json
   Server->>Express: Start Express server
```

## How It Works

1. `src/index.ts` reads `PORT` and `FIXTURES_DIR`, loads fixtures, enriches them, and builds the shared `MockDataStore`.
2. `src/server.ts` creates the Express app, mounts `/docs`, `/swagger.json`, `/ping`, and then registers routes.
3. `src/server.ts` registers custom handlers before the generic Swagger-derived CRUD routes so custom endpoints win route matching.
4. `src/routes/swagger-routes.ts` now focuses on swagger-derived CRUD routes and the sub-resource fallback.
5. `src/handlers/` contains special endpoints that need explicit validation, resource lookups, or task creation.
6. Everything is backed by the in-memory `MockDataStore`, so the server is fast, disposable, and reset on restart.

## Request Flow

```text
HTTP request
  -> Express middleware
  -> custom handler if route matches
  -> generic Swagger route if not handled earlier
  -> read/write MockDataStore
  -> JSON response
```

## Custom Handler Flow

```mermaid
sequenceDiagram
  participant Client as Client
  participant Handler as src/handlers/*
  participant Store as MockDataStore
  participant Tasks as src/tasks.ts

  Client->>Handler: POST /rest/v0/... or action route
  Handler->>Handler: Parse body and params
  Handler->>Store: findById(resource, id)
  alt missing referenced entity
    Store-->>Handler: null
    Handler-->>Client: 404 { error, data }
  else entity exists
    Store-->>Handler: entity
    Handler->>Handler: Validate required fields
    alt invalid input
      Handler-->>Client: 400 { error, data }
    else valid input
      alt create endpoint
        Handler->>Store: addItem(collection, item)
        Store-->>Handler: stored item
        Handler-->>Client: 201 { id }
      else action endpoint
        Handler->>Store: updateItem(collection, id, updates)
        Handler->>Tasks: CreateSuccessTask / CreateFailedTask
        Tasks-->>Handler: task record
        Handler-->>Client: 202 { taskId }
      end
    end
  end
```

### What The Store Does

- `findById()` retrieves the referenced object from the in-memory collection.
- `addItem()` appends newly created objects to the target collection.
- `updateItem()` mutates an existing object in place and returns the updated record.
- `deleteItem()` removes a record when an action needs to delete or forget it.

### Why Custom Handlers Exist

They are used when the generic Swagger CRUD layer is not enough, for example when the endpoint must:

- validate required fields before creating an object
- verify related resources exist
- generate computed fields like `$pool`, `$VBDs`, or `uuid`
- return a task object instead of a direct resource response
- implement side effects such as VM power-state changes or VDI creation

## Main Pieces

- `src/index.ts`: entrypoint
- `src/server.ts`: Express bootstrap
- `src/fixtures/load-fixtures.ts`: fixture loading
- `src/fixtures/enrich-fixtures.ts`: schema defaults and computed fields
- `src/routes/swagger-routes.ts`: Swagger route generation
- `src/handlers/*`: custom endpoint logic
- `src/data-store.ts`: in-memory persistence layer
- `swagger.json`: source of generic route definitions

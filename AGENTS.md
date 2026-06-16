# Adding new endpoints

Each new custom endpoint (overriding the generic swagger CRUD) follows the same pattern established by `POST /vdis`.

## 1. Define the body type in `src/types.ts`

Mirror the real XO controller's type definition from the [xen-orchestra repo](https://github.com/vatesfr/xen-orchestra/tree/master/%40xen-orchestra/rest-api/src).

Real XO controllers use `Parameters<Xapi['METHOD_NAME']>` to derive their body types. Replicate this exactly:

```typescript
// Real: https://github.com/vatesfr/xen-orchestra/blob/master/%40xen-orchestra/rest-api/src/vdis/vdi.controller.mts#L51-L55
type CreateVdiParams = Parameters<Xapi['VDI_create']>
export type CreateVdiBody = Omit<CreateVdiParams[0], 'SR' | 'other_config'> & {
  srId: string
  other_config?: { [key: string]: string }
} & CreateVdiParams[1]
```

Look up the real controller for your resource under `@xen-orchestra/rest-api/src/<resource>/` to find:
- The exact `Xapi` method to use (e.g. `Xapi['VDI_create']`, `Xapi['VIF_create']`, `Xapi['VBD_create']`)
- Which fields are omitted and which are remapped (e.g. `SR` → `srId`)

## 2. Create the handler in `src/handlers/<resource>.ts`

Follow the exact same pattern as `src/handlers/vdis.ts`:

```typescript
import type express from 'express'
import { v4 as uuid } from 'uuid'
import type { MockDataStore } from '../data-store'
import type { CreateXxxBody } from '../types'

export function registerXxxHandlers(app: express.Application, dataStore: MockDataStore) {
  app.post('/rest/v0/<resources>', (req, res) => createXxx(req, res, dataStore))
}

function createXxx(req: express.Request, res: express.Response, dataStore: MockDataStore) {
  const body = req.body as CreateXxxBody

  // 1. Validate required fields
  if (!body.someRequiredField) {
    return res.status(400).json({
      error: 'someRequiredField is required',
      data: { id: null, type: 'SOME_TYPE' },
    })
  }

  // 2. Validate referenced entities exist in the data store
  const entity = dataStore.findById('<resources>', body.someId)
  if (!entity) {
    return res.status(404).json({
      error: `no such TYPE ${body.someId}`,
      data: { id: body.someId, type: 'TYPE' },
    })
  }

  // 3. Mirror the real XO controller's destructuring
  const { someId, extraOption, ...rest } = body

  // 4. Build the stored object with generated + computed fields
  const id = uuid()
  const item = {
    ...rest,
    id,
    uuid: id,
    // explicit mappings from body fields to stored fields
    $RELATED: someId,
    some_field: rest.someBodyField ?? 'default',
    // override type discriminator if body spreads one
    type: 'ITEM_TYPE' as const,
    // computed mock-only fields
    current_operations: {},
    // ...
  }

  dataStore.addItem('<resources>', item)
  res.status(201).json({ id })
}
```

## 3. Register the handler in `src/handlers/index.ts`

```typescript
import { registerXxxHandlers } from './xxx'

export function registerCustomHandlers(app, dataStore) {
  registerVdiHandlers(app, dataStore)
  registerXxxHandlers(app, dataStore) // add here
}
```

## Key patterns

- **Types**: Mirror the real XO controller's type derivation using `Parameters<Xapi['METHOD_NAME']>` — this keeps types automatically in sync with the real API.
- **Destructuring**: Always destructure extracted fields (like `srId`, `sm_config`) separately from `...rest`, exactly like the real controller.
- **Validation**: Return 400 for missing required fields, 404 for not-found referenced entities, 201 with `{ id }` on success.
- **Error format**: Always `{ error: string, data: { id, type } }`.
- **Response format**: Always `{ id }` for create endpoints.

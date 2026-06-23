# Adding New Endpoints

Custom endpoints override the generic Swagger CRUD routes. The current pattern is established by `POST /rest/v0/vdis`, `POST /rest/v0/vifs`, `POST /rest/v0/vbds`, pool VM creation, and the action endpoints under `vms`, `vbds`, `pbds`, and `srs`.

## 1. Define the body type in `src/types.ts`

Mirror the real XO controller's type definition from the Xen Orchestra repo.

Real XO controllers use `Parameters<Xapi['METHOD_NAME']>` to derive body types. Replicate that exactly when possible:

```typescript
// Real: https://github.com/vatesfr/xen-orchestra/blob/master/%40xen-orchestra/rest-api/src/vdis/vdi.controller.mts#L51-L55
type CreateVdiParams = Parameters<Xapi['VDI_create']>
export type CreateVdiBody = Omit<CreateVdiParams[0], 'SR' | 'other_config'> & {
  srId: Branded<'SR'>
  other_config?: { [key: string]: string }
} & CreateVdiParams[1]
```

Look up the real controller for your resource under `@xen-orchestra/rest-api/src/<resource>/` to find:

- The exact `Xapi` method to use, for example `Xapi['VDI_create']`, `Xapi['VIF_create']`, `Xapi['VBD_create']`, or `Xapi['createVm']`
- Which fields are omitted and which are remapped, for example `SR` → `srId`

## 2. Create the handler in `src/handlers/<resource>.ts`

Follow the same pattern as the existing handlers:

```typescript
import type express from 'express'
import { v4 as uuid } from 'uuid'
import type { MockDataStore } from '../data-store'
import type { CreateXxxBody } from '../types'

export function registerXxxHandlers(app: express.Application, dataStore: MockDataStore) {
  app.post('/rest/v0/<resource>', (req, res) => createXxx(req, res, dataStore))
}

function createXxx(req: express.Request, res: express.Response, dataStore: MockDataStore) {
  const body = req.body as CreateXxxBody

  if (!body.someRequiredField) {
    return res.status(400).json({
      error: 'someRequiredField is required',
      data: { id: null, type: 'SOME_TYPE' },
    })
  }

  const entity = dataStore.findById('<resource-collection>', body.someId)
  if (!entity) {
    return res.status(404).json({
      error: `no such TYPE ${body.someId}`,
      data: { id: body.someId, type: 'TYPE' },
    })
  }

  const { someId, extraOption, ...rest } = body

  const id = uuid()
  const item = {
    ...rest,
    id,
    uuid: id,
    $RELATED: someId,
    type: 'ITEM_TYPE' as const,
  }

  dataStore.addItem('<resource-collection>', item)
  res.status(201).json({ id })
}
```

## 3. Register the handler in `src/handlers/index.ts`

```typescript
import { registerXxxHandlers } from './xxx'

export function registerCustomHandlers(app, dataStore) {
  registerTagHandlers(app, dataStore)
  registerVdiHandlers(app, dataStore)
  registerVifHandlers(app, dataStore)
  registerPbdHandlers(app, dataStore)
  registerTasksHandlers(app, dataStore)
  registerSRHandlers(app, dataStore)
  registerPoolHandlers(app, dataStore)
  registerVbdHandlers(app, dataStore)
  registerVmHandlers(app, dataStore)
  registerXxxHandlers(app, dataStore)
}
```

## Key patterns

- **Types**: Prefer `Parameters<Xapi['METHOD_NAME']>` so the mock stays aligned with the real API.
- **Destructuring**: Pull remapped fields out separately from `...rest` before building the stored object.
- **Validation**: Return `400` for missing required fields, `404` for missing referenced entities, `201` for successful creates, and `202` for async actions.
- **Error format**: Use `{ error: string, data: { id, type } }` consistently.
- **Response format**: Create endpoints return `{ id }`; async actions return `{ taskId }`.
- **Registration order**: Register custom handlers before the generic Swagger router so they win route matching.

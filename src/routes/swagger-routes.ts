import express from 'express'
import swagger from '../../swagger.json'
import { dataStore } from '../data-store'
import { v4 as uuid } from 'uuid'

// Resources to exclude (special endpoints)
const EXCLUDED_RESOURCES = ['dashboard', 'ping', 'mcp', 'events', 'docs', 'sms', 'backup', 'restore']

// Map swagger path params to express params
function mapPathParams(swaggerPath: string): string {
  return swaggerPath.replace(/\{([^}]+)\}/g, ':$1')
}

// Extract resource name from path
function getResourceName(path: string): string | null {
  const match = path.match(/^\/([a-z]+)/)
  return match ? match[1] : null
}

// Get collection name for a resource (already plural from swagger paths)
function getCollectionName(resourceName: string): string {
  // Resource names from swagger paths are already plural
  // Map them to the collection names in our data store
  const collectionMap: Record<string, string> = {
    'vms': 'vms',
    'hosts': 'hosts',
    'pools': 'pools',
    'networks': 'networks',
    'vdis': 'vdis',
    'vbds': 'vbds',
    'vifs': 'vifs',
    'pifs': 'pifs',
    'pbds': 'pbds',
    'pcis': 'pcis',
    'pgpus': 'pgpus',
    'srs': 'srs',
    'users': 'users',
    'groups': 'groups',
    'tasks': 'tasks',
    'messages': 'messages',
    'alarms': 'alarms',
    'schedules': 'schedules',
    'proxies': 'proxies',
    'servers': 'servers',
    'acl-roles': 'acl-roles',
    'acl-privileges': 'acl-privileges',
    'vm-templates': 'vm-templates',
    'vm-snapshots': 'vm-snapshots',
    'vm-controllers': 'vm-controllers',
    'vdi-snapshots': 'vdi-snapshots'
  }
  
  return collectionMap[resourceName] || resourceName
}

// Handle GET /{resource} - list all
function handleList(req: express.Request, res: express.Response, resourceName: string) {
  const collection = getCollectionName(resourceName)
  const items = dataStore.getResource(collection)

  // No fields param → return array of resource URIs
  if (!req.query.fields) {
    const uris = items.map(item => `/rest/v0/${resourceName}/${item.id}`)
    return res.json(uris)
  }
  
  // Apply filter if present
  let filtered = items
  if (req.query.filter) {
    // TODO: Implement XO filter language
    console.log(`Filter not yet implemented: ${req.query.filter}`)
  }
  
  // Apply limit if present
  if (req.query.limit) {
    filtered = filtered.slice(0, parseInt(req.query.limit as string))
  }
  
  // Apply fields selection if present (* means all fields)
  if (req.query.fields !== '*') {
    const fields = (req.query.fields as string).split(',').map(f => f.trim())
    filtered = filtered.map(item => {
      const selected: any = {}
      fields.forEach(f => {
        if (item[f] !== undefined) {
          selected[f] = item[f]
        }
      })
      return selected
    })
  }
  
  res.json(filtered)
}

// Handle GET /{resource}/{id} - get by ID
function handleGetById(req: express.Request, res: express.Response, resourceName: string) {
  const collection = getCollectionName(resourceName)
  const item = dataStore.findById(collection, req.params.id)
  
  if (!item) {
    return res.status(404).json({ error: 'Resource not found' })
  }
  
  // Apply fields selection if present (* means all fields)
  if (req.query.fields && req.query.fields !== '*') {
    const fields = (req.query.fields as string).split(',').map(f => f.trim())
    const selected: any = {}
    fields.forEach(f => {
      if (item[f] !== undefined) {
        selected[f] = item[f]
      }
    })
    return res.json(selected)
  }
  
  res.json(item)
}

// Handle POST /{resource} - create
function handleCreate(req: express.Request, res: express.Response, resourceName: string) {
  const collection = getCollectionName(resourceName)
  const newItem = {
    ...req.body,
    id: req.body.id || uuid()
  }
  const created = dataStore.addItem(collection, newItem)
  res.status(201).json(created)
}

// Handle PUT /{resource}/{id} - update
function handleUpdate(req: express.Request, res: express.Response, resourceName: string) {
  const collection = getCollectionName(resourceName)
  const updated = dataStore.updateItem(collection, req.params.id, req.body)
  
  if (!updated) {
    return res.status(404).json({ error: 'Resource not found' })
  }
  
  res.json(updated)
}

// Handle DELETE /{resource}/{id} - delete
function handleDelete(req: express.Request, res: express.Response, resourceName: string) {
  const collection = getCollectionName(resourceName)
  const deleted = dataStore.deleteItem(collection, req.params.id)
  
  if (!deleted) {
    return res.status(404).json({ error: 'Resource not found' })
  }
  
  res.json({ success: true })
}

// Handle POST /{resource}/{id}/actions/{action} - execute action
function handleAction(req: express.Request, res: express.Response, resourceName: string) {
  const action = req.params.action
  const id = req.params.id
  
  console.log(`Action ${action} on ${resourceName} ${id} - not yet implemented`)
  res.status(501).json({ 
    error: 'Action not implemented',
    action,
    resourceId: id
  })
}

// Register all routes from swagger spec
export function registerSwaggerRoutes(app: express.Application) {
  const paths = (swagger as any).paths
  const basePath = '/rest/v0'
  
  Object.entries(paths).forEach(([path, methods]: [string, any]) => {
    // Skip excluded resources
    const resourceName = getResourceName(path)
    if (resourceName && EXCLUDED_RESOURCES.includes(resourceName)) {
      return
    }
    
    // Handle each HTTP method
    Object.entries(methods).forEach(([method, operation]: [string, any]) => {
      if (['get', 'post', 'put', 'patch', 'delete'].includes(method)) {
        // Add the /rest/v0 prefix to all paths
        const expressPath = basePath + mapPathParams(path)
        
        // Determine handler based on path pattern
        const handler = (req: express.Request, res: express.Response) => {
          try {
            // Check if this is an action endpoint
            if (path.includes('/actions/')) {
              return handleAction(req, res, resourceName || '')
            }
            
            // Check if this is a stats endpoint
            if (path.includes('/stats')) {
              console.log(`Stats endpoint not yet implemented: ${path}`)
              return res.status(501).json({ error: 'Stats not implemented' })
            }
            
            // Check if this is a download endpoint
            if (path.includes('.{format}')) {
              console.log(`Download endpoint not yet implemented: ${path}`)
              return res.status(501).json({ error: 'Download not implemented' })
            }
            
            // Standard CRUD operations
            if (method === 'get' && !path.includes('{id}')) {
              return handleList(req, res, resourceName || '')
            }
            
            if (method === 'get' && path.includes('{id}')) {
              return handleGetById(req, res, resourceName || '')
            }
            
            if (method === 'post' && !path.includes('{id}')) {
              return handleCreate(req, res, resourceName || '')
            }
            
            if ((method === 'put' || method === 'patch') && path.includes('{id}')) {
              return handleUpdate(req, res, resourceName || '')
            }
            
            if (method === 'delete' && path.includes('{id}')) {
              return handleDelete(req, res, resourceName || '')
            }
            
            // Default handler
            console.log(`No handler for ${method.toUpperCase()} ${path}`)
            res.status(501).json({ error: 'Not implemented' })
          } catch (err) {
            console.error(`Error handling ${method.toUpperCase()} ${path}:`, err)
            res.status(500).json({ error: 'Internal server error' })
          }
        }
        
        // Register route
        app[method as keyof express.Application](expressPath, handler)
        console.log(`Registered ${method.toUpperCase()} ${expressPath}`)
      }
    })
  })
  
  console.log('Swagger routes registered with /rest/v0 prefix')
}

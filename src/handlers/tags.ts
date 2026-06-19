import type express from 'express'
import type { MockDataStore } from '../data-store'

export function registerTagHandlers(app: express.Application, dataStore: MockDataStore) {
  // Tag sub-resource endpoints for all taggable resources
  const taggableResources = [
    'vms',
    'vm-templates',
    'vm-snapshots',
    'vm-controllers',
    'vdis',
    'vdi-snapshots',
    'srs',
    'pools',
    'networks',
  ]

  for (const resource of taggableResources) {
    // PUT /rest/v0/{resource}/{id}/tags/{tag} - Add or update a tag
    app.put(`/rest/v0/${resource}/:id/tags/:tag`, (req, res) => {
      return addOrUpdateTag(req, res, dataStore, resource)
    })

    // DELETE /rest/v0/{resource}/{id}/tags/:tag - Remove a tag
    app.delete(`/rest/v0/${resource}/:id/tags/:tag`, (req, res) => {
      return removeTag(req, res, dataStore, resource)
    })
  }
}

function addOrUpdateTag(
  req: express.Request,
  res: express.Response,
  dataStore: MockDataStore,
  resourceName: string,
) {
  const { id, tag } = req.params

  // Validate referenced entity exists
  const entity = dataStore.findById(resourceName, id)
  if (!entity) {
    return res.status(404).json({
      error: `no such ${resourceName.slice(0, -1)} ${id}`,
      data: { id, type: resourceName.slice(0, -1).toUpperCase() },
    })
  }

  // Ensure tags array exists
  if (!entity.tags) {
    entity.tags = []
  }

  // Add or update the tag
  const tagIndex = entity.tags.indexOf(tag)
  if (tagIndex === -1) {
    entity.tags.push(tag)
  } else {
    entity.tags[tagIndex] = tag
  }

  // Update the item in the data store
  dataStore.updateItem(resourceName, id, { tags: entity.tags })

  // Return 204 No Content for success
  return res.status(204).send()
}

function removeTag(
  req: express.Request,
  res: express.Response,
  dataStore: MockDataStore,
  resourceName: string,
) {
  const { id, tag } = req.params

  // Validate referenced entity exists
  const entity = dataStore.findById(resourceName, id)
  if (!entity) {
    return res.status(404).json({
      error: `no such ${resourceName.slice(0, -1)} ${id}`,
      data: { id, type: resourceName.slice(0, -1).toUpperCase() },
    })
  }

  // Ensure tags array exists
  if (!entity.tags) {
    entity.tags = []
  }

  // Remove the tag if it exists
  const tagIndex = entity.tags.indexOf(tag)
  if (tagIndex !== -1) {
    entity.tags.splice(tagIndex, 1)
    dataStore.updateItem(resourceName, id, { tags: entity.tags })
  }

  // Return 204 No Content for success
  return res.status(204).send()
}

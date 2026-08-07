import type express from "express";
import type { MockDataStore } from "../data-store";

export function registerRelationHandlers(
  app: express.Application,
  dataStore: MockDataStore,
) {
  registerRelation(app, dataStore, "groups", "acl-roles", "$aclRoles");
  registerRelation(app, dataStore, "acl-roles", "users", "$users");
  registerRelation(app, dataStore, "acl-roles", "groups", "$groups");
}

function registerRelation(
  app: express.Application,
  dataStore: MockDataStore,
  parentCollection: string,
  childCollection: string,
  relationField: string,
) {
  app.get(`/rest/v0/${parentCollection}/:id/${childCollection}`, (req, res) => {
    const parent = dataStore.findById(parentCollection, req.params.id);
    if (!parent) {
      return res.status(404).json({
        error: `no such ${parentCollection} ${req.params.id}`,
        data: { id: req.params.id, type: parentCollection },
      });
    }
    const ids: string[] = parent[relationField] ?? [];
    return res.json(ids.map((id) => `/rest/v0/${childCollection}/${id}`));
  });
}

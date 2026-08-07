import type express from "express";
import type { MockDataStore } from "../data-store";

export function registerSdnHandlers(
  app: express.Application,
  dataStore: MockDataStore,
) {
  for (const collection of ["networks", "vifs"]) {
    app.post(
      `/rest/v0/plugins/sdn-controller/${collection}/:id/actions/update_traffic_rule`,
      (req, res) => {
        const item = dataStore.findById(collection, req.params.id);
        if (!item) {
          return res.status(404).json({
            error: `no such ${collection} ${req.params.id}`,
            data: { id: req.params.id, type: collection },
          });
        }
        const { oldRule, newRule } = req.body ?? {};
        if (!oldRule || !newRule) {
          return res.status(400).json({
            error: "oldRule and newRule are required",
            data: { id: req.params.id, type: collection },
          });
        }
        const rules = Array.isArray(item.trafficRules)
          ? [...item.trafficRules]
          : [];
        const index = rules.findIndex(
          (rule) => JSON.stringify(rule) === JSON.stringify(oldRule),
        );
        if (index === -1) rules.push(newRule);
        else rules[index] = newRule;
        dataStore.updateItem(collection, req.params.id, {
          trafficRules: rules,
        });
        return res.status(204).send();
      },
    );
  }
}

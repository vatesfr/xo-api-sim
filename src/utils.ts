import type express from "express";
import * as CM from "complex-matcher";

export function applyLimit<T>(items: T[], req: express.Request): T[] {
  const limit = req.query.limit
    ? parseInt(req.query.limit as string, 10)
    : undefined;
  return limit !== undefined && !isNaN(limit) ? items.slice(0, limit) : items;
}

export function applyFilter<T>(items: T[], req: express.Request): T[] {
  if (!req.query.filter) {
    return items;
  }
  const predicate = CM.parse(req.query.filter as string).createPredicate();
  return items.filter(predicate);
}

export function selectFields(item: Record<string, any>, fields: string[]): Record<string, any> {
  const selected: Record<string, any> = {};
  for (const f of fields) {
    if (item[f] !== undefined) {
      selected[f] = item[f];
    }
  }
  return selected;
}

export function parseFields(req: express.Request): string[] | null {
  if (!req.query.fields) {
    return null;
  }
  return (req.query.fields as string).split(",").map((f) => f.trim());
}

export function applyFields<T extends Record<string, any>>(
  items: T[],
  req: express.Request,
): any[] {
  const fields = parseFields(req);
  if (fields === null || req.query.fields === "*") {
    return items;
  }
  return items.map((item) => selectFields(item, fields));
}

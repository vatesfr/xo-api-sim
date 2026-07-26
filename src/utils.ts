import type express from "express";
import * as CM from "complex-matcher";

/**
 * The XO 6 web UI requests collections as newline-delimited JSON
 * (`?ndjson=true`) and parses the response body as a stream of objects, one per
 * line. Returns true unless the caller explicitly opted out with `ndjson=false`.
 */
export function wantsNdjson(req: express.Request): boolean {
  const v = req.query.ndjson;
  return v !== undefined && v !== "false";
}

/**
 * Sends a list of records either as a JSON array (default REST behavior) or as
 * an NDJSON stream when the client asked for `ndjson=true`.
 */
export function sendCollection(
  res: express.Response,
  req: express.Request,
  items: any[],
): void {
  if (wantsNdjson(req)) {
    res.setHeader("Content-Type", "application/x-ndjson");
    for (const item of items) {
      res.write(JSON.stringify(item) + "\n");
    }
    res.end();
    return;
  }
  res.json(items);
}

/**
 * Sends a single record, honoring `ndjson=true` (the web UI uses it for
 * dashboard endpoints, which stream a single object).
 */
export function sendObject(
  res: express.Response,
  req: express.Request,
  obj: any,
): void {
  if (wantsNdjson(req)) {
    res.setHeader("Content-Type", "application/x-ndjson");
    res.write(JSON.stringify(obj) + "\n");
    res.end();
    return;
  }
  res.json(obj);
}

export function applyLimit<T>(items: T[], req: express.Request): T[] {
  const limit = req.query.limit
    ? parseInt(req.query.limit as string, 10)
    : undefined;
  return limit !== undefined && !isNaN(limit) && limit > 0
    ? items.slice(0, limit)
    : items;
}

export function applyFilter<T>(items: T[], req: express.Request): T[] {
  if (!req.query.filter) {
    return items;
  }
  const predicate = CM.parse(req.query.filter as string).createPredicate();
  return items.filter(predicate);
}

export function selectFields(
  item: Record<string, any>,
  fields: string[],
): Record<string, any> {
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

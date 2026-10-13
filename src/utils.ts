import type express from "express";
import * as CM from "complex-matcher";

/**
 * The XO 6 web UI requests collections as newline-delimited JSON
 * (`?ndjson=true`) and parses the response body as a stream of objects, one per
 * line. Like XO's `sendObjects`, only the exact string `true` opts in.
 */
export function wantsNdjson(req: express.Request): boolean {
  return req.query.ndjson === "true";
}

function writeNdjson(res: express.Response, items: unknown[]): void {
  res.setHeader("Content-Type", "application/x-ndjson");
  for (const item of items) {
    res.write(JSON.stringify(item) + "\n");
  }
  res.end();
}

/**
 * Sends a list of records either as a JSON array (default REST behavior) or as
 * an NDJSON stream when the client asked for `ndjson=true`.
 */
export function sendCollection<T>(
  res: express.Response,
  req: express.Request,
  items: T[],
): void {
  if (wantsNdjson(req)) {
    return writeNdjson(res, items);
  }
  res.json(items);
}

/**
 * Sends a single record, honoring `ndjson=true` (the web UI uses it for
 * dashboard endpoints, which stream a single object).
 */
export function sendObject<T>(
  res: express.Response,
  req: express.Request,
  obj: T,
): void {
  if (wantsNdjson(req)) {
    return writeNdjson(res, [obj]);
  }
  res.json(obj);
}

/**
 * Mirrors XO's `sendObjects`: without `fields`, sends the records' hrefs
 * (`<basePath>/<id>`); otherwise sends the projected records (all fields for
 * `fields=*`) with an `href` property. Honors `ndjson=true`. `basePath` may
 * depend on the record (e.g. VDIs vs VDI snapshots).
 */
export function sendObjects<T extends { id: string }>(
  res: express.Response,
  req: express.Request,
  items: T[],
  basePath: string | ((item: T) => string),
): void {
  const href = (item: T) =>
    `${typeof basePath === "string" ? basePath : basePath(item)}/${item.id}`;
  const fields = parseFields(req);
  if (fields === null) {
    return sendCollection(res, req, items.map(href));
  }
  sendCollection(
    res,
    req,
    items.map((item) => ({
      ...(req.query.fields === "*" ? item : selectFields(item, fields)),
      href: href(item),
    })),
  );
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

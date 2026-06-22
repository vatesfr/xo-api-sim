import type express from "express";

export function applyLimit<T>(items: T[], req: express.Request): T[] {
  const limit = req.query.limit
    ? parseInt(req.query.limit as string, 10)
    : undefined;
  return limit !== undefined && !isNaN(limit) ? items.slice(0, limit) : items;
}

import { readdir, readFile } from "node:fs/promises";
import { join, parse } from "node:path";

export async function loadFixtures(
  fixturesDir: string,
): Promise<Record<string, any[]>> {
  let entries: string[];
  try {
    entries = await readdir(fixturesDir);
  } catch {
    return {};
  }

  const jsonFiles = entries.filter((f) => f.endsWith(".json"));
  const result: Record<string, any[]> = {};

  for (const file of jsonFiles) {
    const content = await readFile(join(fixturesDir, file), "utf-8");
    let data: any;
    try {
      data = JSON.parse(content);
    } catch (_e) {
      console.warn(`Warning: failed to parse ${file}, skipping`);
      continue;
    }

    const collectionName = parse(file).name;

    if (Array.isArray(data)) {
      result[collectionName] = (result[collectionName] || []).concat(data);
    } else if (typeof data === "object" && data !== null) {
      for (const [key, items] of Object.entries(data)) {
        if (Array.isArray(items)) {
          result[key] = (result[key] || []).concat(items);
        }
      }
    }
  }

  return result;
}

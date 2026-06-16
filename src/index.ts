import { resolve } from "node:path";
import { MockDataStore } from "./data-store";
import { loadFixtures } from "./fixtures/load-fixtures";
import { startServer } from "./server";

async function main() {
  const port = parseInt(process.env.PORT || "3001", 10);
  const fixturesDir =
    process.env.FIXTURES_DIR || resolve(__dirname, "fixtures");

  const fixtures = await loadFixtures(fixturesDir);
  const dataStore = new MockDataStore(fixtures);

  await startServer(port, dataStore);
  console.log(`Mock XO API server running on port ${port}`);
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

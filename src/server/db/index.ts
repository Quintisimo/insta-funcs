import { createRequire } from "node:module";
import { drizzle } from "drizzle-orm/better-sqlite3";
const require = createRequire(import.meta.url);

import * as schema from "./schema";

const Database = require("better-sqlite3");

export const dbUrl = import.meta.env.PROD
  ? "../data/db.sqlite"
  : "./data/db.sqlite";

const sqlite = new Database(dbUrl);
export const db = drizzle({ client: sqlite, schema });

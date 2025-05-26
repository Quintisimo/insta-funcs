import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export const dbUrl = "file:./data/db.sqlite";

export const db = drizzle(dbUrl, { schema });

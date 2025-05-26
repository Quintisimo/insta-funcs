import { sql } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const functions = sqliteTable("functions", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  originalCode: text("originalCode").notNull(),
  compiledCode: text("compiledCode").notNull(),
  method: text({ enum: ["GET", "POST"] }).notNull(),
  createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
});

import { Config } from "drizzle-kit";
import { dbUrl } from "./src/server/db";

export default {
  dialect: "sqlite",
  schema: "./src/server/db/schema.ts",
  out: "./src/server/db/migrations",
  dbCredentials: {
    url: dbUrl,
  },
} satisfies Config;

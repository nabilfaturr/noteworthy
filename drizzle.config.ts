import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
import "dotenv/config"
dotenv.config();

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  driver: "turso",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;

import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
const client = createClient({
  url: "libsql://noteworthy-nabilfaturr.turso.io",
  authToken: process.env.TURSO_AUTH_TOKEN!,
});
export const db = drizzle(client);

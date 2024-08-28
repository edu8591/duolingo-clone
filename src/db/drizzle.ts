import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import path from "path";
import * as schema from "./schema";

const envPath = path.resolve(__dirname, "./../../.env.local");
config({ path: envPath });
const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });

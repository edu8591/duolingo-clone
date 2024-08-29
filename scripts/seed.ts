import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

config({ path: "./.env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding DB");
    await db.delete(schema.userProgress);
    await db.delete(schema.courses);

    await db.insert(schema.courses).values([
      { title: "Spanish", imageSrc: "/images/flags/ES.svg" },
      { title: "German", imageSrc: "/images/flags/DE.svg" },
      { title: "French", imageSrc: "/images/flags/FR.svg" },
      { title: "Japanese", imageSrc: "/images/flags/JP.svg" },
      { title: "Russian", imageSrc: "/images/flags/RU.svg" },
      { title: "English", imageSrc: "/images/flags/US.svg" },
    ]);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed DB");
  }
};

main();

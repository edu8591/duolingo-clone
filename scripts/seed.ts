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
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    await db.insert(schema.courses).values([
      { title: "Spanish", imageSrc: "/images/flags/ES.svg" },
      { title: "German", imageSrc: "/images/flags/DE.svg" },
      { title: "French", imageSrc: "/images/flags/FR.svg" },
      { title: "Japanese", imageSrc: "/images/flags/JP.svg" },
      { title: "Russian", imageSrc: "/images/flags/RU.svg" },
      { title: "English", imageSrc: "/images/flags/US.svg" },
    ]);

    const courses = await db.query.courses.findMany();

    await db.insert(schema.units).values({
      id: 1,
      courseId: courses[0].id,
      title: "Unit 1",
      description: `Learn the basics of ${courses[0].title}`,
      order: 1,
    });

    const units = await db.query.units.findMany();
    await db.insert(schema.lessons).values([
      {
        title: "Nouns",
        unitId: units[0].id,
        order: 1,
      },
      {
        title: "Verbs",
        unitId: units[0].id,
        order: 2,
      },
    ]);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed DB");
  }
};

main();

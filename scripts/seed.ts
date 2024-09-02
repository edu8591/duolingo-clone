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
      {
        title: "Adjectives",
        unitId: units[0].id,
        order: 3,
      },
      {
        title: "Present",
        unitId: units[0].id,
        order: 4,
      },
      {
        title: "Past",
        unitId: units[0].id,
        order: 5,
      },
      {
        title: "test",
        unitId: units[0].id,
        order: 6,
      },
      {
        title: "test",
        unitId: units[0].id,
        order: 7,
      },
      {
        title: "test",
        unitId: units[0].id,
        order: 8,
      },
      {
        title: "test",
        unitId: units[0].id,
        order: 9,
      },
      {
        title: "test",
        unitId: units[0].id,
        order: 10,
      },
    ]);

    const lessons = await db.query.lessons.findMany();

    await db.insert(schema.challenges).values([
      {
        lessonId: lessons[0].id,
        question: 'Which of these is "the man"?',
        type: "SELECT",
        order: 1,
      },
    ]);

    const challenges = await db.query.challenges.findMany();
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: challenges[0].id,
        imageSrc: "/images/man.svg",
        correct: true,
        text: "El hombre",
        audioSrc: "/audio/es/man.mp3",
      },
      {
        challengeId: challenges[0].id,
        imageSrc: "/images/woman.svg",
        correct: false,
        text: "La mujer",
        audioSrc: "/audio/es/woman.mp3",
      },
      {
        challengeId: challenges[0].id,
        imageSrc: "/images/robot.svg",
        correct: false,
        text: "El robot",
        audioSrc: "/audio/es/robot.mp3",
      },
    ]);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed DB");
  }
};

main();

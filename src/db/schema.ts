import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull().unique(),
  imageSrc: text("image_src").notNull(),
});

export type InsertCourses = typeof courses.$inferInsert;
export type SelectCourses = typeof courses.$inferSelect;

"use server";

import { db, getCourseById, getUserProgress, insertUserProgress } from "@/db";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertUserProgress = async (id: number) => {
  const { userId } = await auth();
  const user = await currentUser();
  if (!userId || !user) throw new Error("Unauthorized");

  const course = getCourseById(id);

  if (!course) throw new Error("Course not found");

  //todo enable when units and lessons are added
  // if(!course.units.length || !course.units[0].lessons.length) throw new Error("Course is empty");

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: id,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/images/mascot.png",
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
  }
  await insertUserProgress(id, userId, user.firstName, user.imageUrl);
  // await db.insert(userProgress).values({
  //   userId,
  //   activeCourseId: id,
  //   userName: user.firstName || "User",
  //   userImageSrc: user.imageUrl || "/images/mascot.png",
  // });
  // revalidatePath("/courses");
  // revalidatePath("/learn");
  // redirect("/learn");
};

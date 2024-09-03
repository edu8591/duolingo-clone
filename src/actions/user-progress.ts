"use server";

import { POINTS_TO_REFILL_HEARTS } from "@/constants";
import {
  db,
  getChallengeById,
  getCourseById,
  getExistingChallengeProgress,
  getUserProgress,
  insertUserProgress,
  reduceUserProgressHearts,
  refillUserHearts,
} from "@/db";
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
      userImageSrc: user.imageUrl || "/images/mascot.svg",
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
  }
  await insertUserProgress(id, userId, user.firstName, user.imageUrl);
};

export const reduceHearts = async (
  challengeId: number
): Promise<{ error: "practice" | "hearts" } | void> => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) throw new Error("User process not found");

  const challenge = await getChallengeById(challengeId);

  if (!challenge) throw new Error("Challenge not found");

  const existingChallengeProgress = await getExistingChallengeProgress(
    userId,
    challengeId
  );

  const isPractice = !!existingChallengeProgress;

  if (isPractice) return { error: "practice" };

  //todo handle subscription

  if (currentUserProgress.hearts === 0) return { error: "hearts" };

  await reduceUserProgressHearts(
    currentUserProgress.hearts,
    userId,
    challenge.lessonId
  );
};

export const refillHearts = async () => {
  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) throw new Error("User progress not found");

  if (currentUserProgress.hearts === 5)
    throw new Error("Hearts are already full");

  if (currentUserProgress.points < POINTS_TO_REFILL_HEARTS)
    throw new Error("Not enough points to permform this action");

  await refillUserHearts(currentUserProgress);
};

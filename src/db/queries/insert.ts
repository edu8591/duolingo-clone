import { db, getChallengeById } from "@db";
import { auth } from "@clerk/nextjs/server";
import {
  challengeOptions,
  challengeProgress,
  challenges,
  courses,
  lessons,
  SelectChallengeOptions,
  SelectChallenges,
  SelectLessons,
  SelectUnits,
  SelectUserProgress,
  units,
  userProgress,
  userSubscription,
} from "../schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { POINTS_TO_REFILL_HEARTS } from "@/constants";

export const insertUserProgress = async (
  id: number,
  userId: string,
  username?: string | null,
  userImageSrc?: string
) => {
  // const { userId } = auth();
  // if (!userId) return null;

  await db.insert(userProgress).values({
    userId,
    activeCourseId: id,
    userName: username || "User",
    userImageSrc: userImageSrc || "/images/mascot.svg",
  });
  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};

export const updateChallengProgressCompleted = async (
  challengeProgressId: number
) => {
  await db
    .update(challengeProgress)
    .set({
      completed: true,
    })
    .where(eq(challengeProgress.id, challengeProgressId));
};

export const updateUserProgress = async (
  currentUserProgress: SelectUserProgress,
  userId: string,
  lessonId: number,
  isPractice?: boolean
) => {
  if (isPractice) {
    await db
      .update(userProgress)
      .set({
        hearts: Math.min(currentUserProgress.hearts + 1, 5),
        points: currentUserProgress.points + 10,
      })
      .where(eq(userProgress.userId, userId));
  } else {
    await db
      .update(userProgress)
      .set({
        points: currentUserProgress.points + 10,
      })
      .where(eq(userProgress.userId, userId));
  }
  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath(`/lessons${lessonId}`);
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};

export const createChallengeProgress = async (
  challengeId: number,
  userId: string
) => {
  await db.insert(challengeProgress).values({
    challengeId,
    userId,
    completed: true,
  });
};

export const reduceUserProgressHearts = async (
  hearts: number,
  userId: string,
  lessonId: number
) => {
  await db
    .update(userProgress)
    .set({
      hearts: Math.max(hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};

export const refillUserHearts = async (
  currentUserProgress: SelectUserProgress
) => {
  await db
    .update(userProgress)
    .set({
      hearts: 5,
      points: currentUserProgress.points - POINTS_TO_REFILL_HEARTS,
    })
    .where(eq(userProgress.userId, currentUserProgress.userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};

export const createUserSubscription = async (
  userId: string,
  stripeSubscriptionId: string,
  stripeCustomerId: string,
  stripePriceId: string,
  stripeCurrentPeriodEnd: Date
) => {
  await db.insert(userSubscription).values({
    userId,
    stripeSubscriptionId,
    stripeCustomerId,
    stripePriceId,
    stripeCurrentPeriodEnd,
  });
};

export const renewUserSubscription = async (
  stripePriceId: string,
  stripeCurrentPeriodEnd: Date,
  stripeSubscriptionId: string
) => {
  await db
    .update(userSubscription)
    .set({
      stripePriceId,
      stripeCurrentPeriodEnd,
    })
    .where(eq(userSubscription.stripeSubscriptionId, stripeSubscriptionId));
};

export const insertCourse = async (body: {
  title: string;
  imageSrc: string;
}) => {
  return await db
    .insert(courses)
    .values({
      ...body,
    })
    .returning();
};

export const insertUnit = async (body: SelectUnits) => {
  const data = await db.insert(units).values(body).returning();
  return data;
};

export const updateUnit = async (
  body: Partial<SelectUnits>,
  unitId: number
) => {
  const data = await db
    .update(units)
    .set(body)
    .where(eq(units.id, unitId))
    .returning();
  return data;
};

export const deleteUnit = async (unitId: number) => {
  return await db.delete(units).where(eq(units.id, unitId)).returning();
};

export const insertLesson = async (body: SelectLessons) => {
  return await db.insert(lessons).values(body).returning();
};

export const updateLesson = async (
  body: Omit<SelectLessons, "id">,
  lessonId: number
) => {
  return await db
    .update(lessons)
    .set(body)
    .where(eq(lessons.id, lessonId))
    .returning();
};

export const deleteLesson = async (lessonId: number) => {
  return await db.delete(lessons).where(eq(lessons.id, lessonId)).returning();
};

export const insertChallenge = async (body: Omit<SelectChallenges, "id">) => {
  return await db.insert(challenges).values(body).returning();
};

export const updateChallenge = async (
  body: Omit<SelectChallenges, "id">,
  challengeId: number
) => {
  return await db
    .update(challenges)
    .set(body)
    .where(eq(challenges.id, challengeId))
    .returning();
};

export const deleteChallenge = async (challengeId: number) => {
  return await db
    .delete(challenges)
    .where(eq(challenges.id, challengeId))
    .returning();
};

export const insertChallengeOption = async (
  body: Omit<SelectChallengeOptions, "id">
) => {
  return await db.insert(challengeOptions).values(body).returning();
};

export const updateChallengeOption = async (
  body: Omit<SelectChallengeOptions, "id">,
  challengeOptionid: number
) => {
  return await db
    .update(challengeOptions)
    .set(body)
    .where(eq(challengeOptions.id, challengeOptionid))
    .returning();
};

export const deleteChallengeOption = async (
  challengeOptionId: SelectChallengeOptions["id"]
) => {
  return await db
    .delete(challengeOptions)
    .where(eq(challengeOptions.id, challengeOptionId))
    .returning();
};

import { db } from "@db";
import { auth } from "@clerk/nextjs/server";
import { challengeProgress, SelectUserProgress, userProgress } from "../schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

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

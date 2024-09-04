"use server";

import {
  createChallengeProgress,
  getChallengeById,
  getExistingChallengeProgressById,
  getUserProgress,
  getUserSubscription,
  updateChallengProgressCompleted,
  updateUserProgress,
} from "@/db";
import { auth } from "@clerk/nextjs/server";

export const upsertChallengeProgress = async (
  challengeId: number
): Promise<{ error: "hearts" } | void> => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const currentUserProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();
  if (!currentUserProgress) throw new Error("User progress not found");

  const challenge = await getChallengeById(challengeId);

  const lessonId = challenge.lessonId;

  const existingChallengeProgress = await getExistingChallengeProgressById(
    challengeId,
    userId
  );

  const isPractice = !!existingChallengeProgress;

  if (
    currentUserProgress.hearts === 0 &&
    !isPractice &&
    !userSubscription?.isActive
  )
    return { error: "hearts" };

  if (isPractice) {
    await updateChallengProgressCompleted(existingChallengeProgress.id);
    await updateUserProgress(currentUserProgress, userId, lessonId, isPractice);
    return;
  }

  await createChallengeProgress(challengeId, userId);
  await updateUserProgress(currentUserProgress, userId, lessonId);
};

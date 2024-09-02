"use server";

import {
  createChallengeProgress,
  getChallengeById,
  getExistingChallengeProgressById,
  getUserProgress,
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
  //todo handle subscription query later

  if (!currentUserProgress) throw new Error("User progress not found");

  const challenge = await getChallengeById(challengeId);

  const lessonId = challenge.lessonId;

  const existingChallengeProgress = await getExistingChallengeProgressById(
    challengeId,
    userId
  );

  const isPractice = !!existingChallengeProgress;
  //todo not if user has subscription
  if (currentUserProgress.hearts === 0 && !isPractice)
    return { error: "hearts" };

  if (isPractice) {
    await updateChallengProgressCompleted(existingChallengeProgress.id);
    await updateUserProgress(currentUserProgress, userId, lessonId, isPractice);
    return;
  }

  await createChallengeProgress(challengeId, userId);
  await updateUserProgress(currentUserProgress, userId, lessonId);
};

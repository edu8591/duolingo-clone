import { getLesson, getUserProgress, getUserSubscription } from "@/db";
import { redirect } from "next/navigation";
import { Quiz } from "../Quiz";

type LessonIdPageProps = {
  params: { lessonId: number };
};
export default async function LessonidPage({ params }: LessonIdPageProps) {
  const { lessonId } = params;
  const [lesson, userProgress, userSubscription] = await Promise.all([
    getLesson(lessonId),
    getUserProgress(),
    getUserSubscription(),
  ]);

  if (!lesson || !userProgress) redirect("/learn");
  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={userSubscription} //todo add userSubscription
    />
  );
}

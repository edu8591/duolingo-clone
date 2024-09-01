import { FeedWrapper, StickyWrapper } from "@/components";
import { Header } from "./Header";
import { UserProgress } from "@/components/UserProgress";
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  SelectLessons,
  SelectUnits,
} from "@/db";
import { redirect } from "next/navigation";
import { Unit } from "./Unit";

export default async function LearnPage() {
  const [userProgress, units, courseProgress, lessonPercentage] =
    await Promise.all([
      getUserProgress(),
      getUnits(),
      getCourseProgress(),
      getLessonPercentage(),
    ]);
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  if (!courseProgress) redirect("/courses");

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => {
          return (
            <div className="mb-10" key={unit.id}>
              <Unit
                id={unit.id}
                order={unit.order}
                description={unit.description}
                title={unit.title}
                lessons={unit.lessons}
                activeLesson={courseProgress.activeLesson}
                activeLessonPercentage={lessonPercentage}
              />
            </div>
          );
        })}
      </FeedWrapper>
    </div>
  );
}

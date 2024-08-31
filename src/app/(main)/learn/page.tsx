import { FeedWrapper, StickyWrapper } from "@/components";
import { Header } from "./Header";
import { UserProgress } from "@/components/UserProgress";
import { getUnits, getUserProgress } from "@/db";
import { redirect } from "next/navigation";
import { Unit } from "./Unit";

export default async function LearnPage() {
  const [userProgress, units] = await Promise.all([
    getUserProgress(),
    getUnits(),
  ]);
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

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
                activeLesson={undefined}
                activeLessonPercentage={0}
              />
            </div>
          );
        })}
      </FeedWrapper>
    </div>
  );
}

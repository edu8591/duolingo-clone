import { FeedWrapper, StickyWrapper } from "@/components";
import { Header } from "./Header";
import { UserProgress } from "@/components/UserProgress";
import { getUserProgress } from "@/db";
import { redirect } from "next/navigation";

export default async function LearnPage() {
  const [userProgress] = await Promise.all([getUserProgress()]);
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
      </FeedWrapper>
    </div>
  );
}

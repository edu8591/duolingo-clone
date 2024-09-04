import {
  FeedWrapper,
  Promo,
  Separator,
  StickyWrapper,
  UserProgress,
} from "@/components";
import { getUserProgress, getUserSubscription } from "@/db";
import Image from "next/image";
import { redirect } from "next/navigation";
import { UserList } from "./UserList";

export default async function LeaderboardPage() {
  const [userProgress, userSubscription] = await Promise.all([
    getUserProgress(),
    getUserSubscription(),
  ]);
  const isPro = !!userSubscription?.isActive;
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hasActiveSubscription={isPro}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
        {!isPro && <Promo />}
      </StickyWrapper>
      <FeedWrapper>
        <div className="flex flex-col items-center w-full">
          <Image
            src="/images/leaderboard.svg"
            height={90}
            width={90}
            alt="Leaderboard"
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Leaderboard
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            See where you stand among other learners in the community.
          </p>
          <Separator className="mb-5 h-0.5 rouded-full" />
          <UserList />
        </div>
      </FeedWrapper>
    </div>
  );
}

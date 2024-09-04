import {
  FeedWrapper,
  Progress,
  StickyWrapper,
  UserProgress,
} from "@/components";
import { getUserProgress, getUserSubscription } from "@/db";
import Image from "next/image";
import { redirect } from "next/navigation";

const quests = [
  { title: "Earn 20 xp", value: 20 },
  { title: "Earn 50 xp", value: 50 },
  { title: "Earn 100 xp", value: 100 },
  { title: "Earn 500 xp", value: 500 },
  { title: "Earn 1,000 xp", value: 1000 },
];

export default async function QuestsPage() {
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
      </StickyWrapper>
      <FeedWrapper>
        <div className="flex flex-col items-center w-full">
          <Image src="/images/quest.svg" height={90} width={90} alt="quests" />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Quests
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Complete quests by earning points.
          </p>
          {/* //todo add quests  */}
          <ul className="w-full">
            {quests.map((quest) => {
              const progress = (userProgress.points / quest.value) * 100;

              return (
                <div
                  className="flex items-center w-full p-4 gap-x-4 border-t-2"
                  key={quest.title}
                >
                  <Image
                    src="/images/points.svg"
                    width={60}
                    height={60}
                    alt="thunder"
                  />
                  <div className="flex flex-col gap-y-2 w-full">
                    <p className="text-neutral-700 text-xl font-bold">
                      {quest.title}
                    </p>
                    <Progress value={progress} className="h-3" />
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
  );
}

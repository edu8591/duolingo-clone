import {
  Avatar,
  AvatarImage,
  FeedWrapper,
  Separator,
  StickyWrapper,
  UserProgress,
} from "@/components";
import { getTopTenUsers, getUserProgress, getUserSubscription } from "@/db";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function LeaderboardPage() {
  const [userProgress, userSubscription, topTenUsers] = await Promise.all([
    getUserProgress(),
    getUserSubscription(),
    getTopTenUsers(),
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
          {
            //todo add UserList
            topTenUsers.map((userProgress, index) => {
              return (
                <div
                  key={userProgress.userId}
                  className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
                >
                  <p className="font-bold text-lime-700 mr-4"> {index + 1}</p>
                  <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
                    <AvatarImage
                      className="object-cover"
                      src={userProgress.userImageSrc}
                    />
                  </Avatar>
                  <p className="font-bold text-neutral-800 flex-1">
                    {userProgress.userName}
                  </p>
                  <p className="text-muted-foreground">
                    {userProgress.points} XP
                  </p>
                </div>
              );
            })
          }
        </div>
      </FeedWrapper>
    </div>
  );
}

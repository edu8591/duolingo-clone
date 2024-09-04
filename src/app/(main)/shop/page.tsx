import {
  FeedWrapper,
  Promo,
  Quests,
  StickyWrapper,
  UserProgress,
} from "@/components";
import { getUserProgress, getUserSubscription } from "@/db";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Items } from "./Items";

export default async function ShopPage() {
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
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="flex flex-col items-center w-full">
          <Image src="/images/shop.svg" height={90} width={90} alt="Shop" />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Shop
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Spend your points on cool stuff
          </p>
          <Items
            hasACtiveSubscription={isPro}
            hearts={userProgress.hearts}
            points={userProgress.points}
          />
        </div>
      </FeedWrapper>
    </div>
  );
}

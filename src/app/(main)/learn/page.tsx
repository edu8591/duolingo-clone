import { FeedWrapper, StickyWrapper } from "@/components";
import { Header } from "./Header";
import { UserProgress } from "@/components/UserProgress";

export default function LearnPage() {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: "Spanish", imageSrc: "/images/flags/ES.svg" }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title="spanish" />
      </FeedWrapper>
    </div>
  );
}

import Link from "next/link";
import { Button } from "./ui";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";
import { SelectCourses } from "@/db";

interface UserProgressProps {
  activeCourse: SelectCourses;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
}
export const UserProgress = ({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
}: UserProgressProps) => {
  return (
    <div className="flex items-center jsutify-between gap-x-2 w-full mt-7">
      <Link href="/courses">
        <Button variant="ghost">
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md border"
            width={32}
            height={32}
          />
        </Button>
      </Link>
      <Link href="shop">
        <Button variant="ghost" className="text-orange-500 ">
          <Image src="/images/points.svg" height={28} width={28} alt="points" />
          {points}
        </Button>
      </Link>
      <Link href="shop">
        <Button variant="ghost" className="text-orange-500 ">
          <Image src="/images/heart.svg" height={28} width={28} alt="hearts" />
          {hasActiveSubscription ? (
            <InfinityIcon className="h-4 w-4 stroke-[3]" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
};

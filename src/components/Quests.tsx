import Image from "next/image";
import { Button, Progress } from "./ui";
import Link from "next/link";
import { quests } from "@/constants";

type QuestsPorps = {
  points: number;
};
export const Quests = ({ points }: QuestsPorps) => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between w-full space-y-2">
        <h3 className="font-bold text-large">Quests</h3>
        <Link href="/quests">
          <Button size="sm" variant="primaryOutline">
            View all
          </Button>
        </Link>
      </div>
      <ul className="w-full space-y-4">
        {quests.map((quest) => {
          const progress = (points / quest.value) * 100;

          return (
            <div
              className="flex items-center w-full pb-4 gap-x-4 "
              key={quest.title}
            >
              <Image
                src="/images/points.svg"
                width={40}
                height={40}
                alt="thunder"
              />
              <div className="flex flex-col gap-y-2 w-full">
                <p className="text-neutral-700 text-sm font-bold">
                  {quest.title}
                </p>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

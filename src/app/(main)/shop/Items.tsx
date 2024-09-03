"use client";

import { refillHearts } from "@/actions/user-progress";
import { Button } from "@/components";
import { POINTS_TO_REFILL_HEARTS } from "@/constants";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

type ItemsProps = {
  hearts: number;
  points: number;
  hasACtiveSubscription: boolean;
};

export const Items = ({
  hearts,
  points,
  hasACtiveSubscription,
}: ItemsProps) => {
  const [pending, startTransition] = useTransition();
  if (pending || hearts === 5 || points < POINTS_TO_REFILL_HEARTS) {
    startTransition(() => {
      refillHearts().catch(() => {
        console.error("Something went wrong...");
        toast.error("Something went wrong...");
      });
    });
  }

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src="/images/heart.svg" height={50} width={50} alt="heart" />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill hearts
          </p>
        </div>

        <Button
          disabled={hearts === 5 || pending || points < POINTS_TO_REFILL_HEARTS}
        >
          {hearts === 5 ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image
                src="/images/points.svg"
                height={20}
                width={20}
                alt="points"
              />
              <p className="">{POINTS_TO_REFILL_HEARTS}</p>
            </div>
          )}
        </Button>
      </div>
    </ul>
  );
};

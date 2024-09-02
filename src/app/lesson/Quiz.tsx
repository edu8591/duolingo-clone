"use client";
import { useState } from "react";
import { Header } from "./Header";
import { SelectChallengeOptions, SelectChallenges } from "@/db";

type QuizProps = {
  initialLessonId: number;
  initialLessonChallenges: (SelectChallenges & {
    completed: boolean;
    challengeOptions: SelectChallengeOptions[];
  })[];
  initialHearts: number;
  initialPercentage: number;
  userSubscription: any;
};

export const Quiz = ({
  initialLessonId,
  initialLessonChallenges,
  initialHearts,
  initialPercentage,
  userSubscription,
}: QuizProps) => {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
    </>
  );
};

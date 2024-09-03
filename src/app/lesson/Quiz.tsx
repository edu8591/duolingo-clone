"use client";
import { useCallback, useState, useTransition } from "react";
import { Header } from "./Header";
import { SelectChallengeOptions, SelectChallenges } from "@/db";
import { QuestionBubble } from "./QuestionBubble";
import { Challenge } from "./Challenge";
import { Footer } from "./Footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio, useWindowSize } from "react-use";
import Image from "next/image";
import { ResultCard } from "./ResultCard";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { FinishScreen } from "./FInishScreen";

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
  // Audio files
  const [correctAudio, _correct, correctControls] = useAudio({
    src: "/audio/correct.wav",
  });
  const playCorrectSound = useCallback(() => {
    correctControls.play();
  }, [correctControls]);
  const [incorrectAudio, _incorrect, incorrectControls] = useAudio({
    src: "/audio/incorrect.wav",
  });
  const playIncorrectSound = useCallback(() => {
    incorrectControls.play();
  }, [incorrectControls]);
  const [pending, startTransition] = useTransition();

  //state
  const [lessonId] = useState(initialLessonId);
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
  const [selectedOption, setSelectedOption] = useState<number | undefined>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  if (!challenge) {
    return (
      <FinishScreen
        challenges={challenges}
        hearts={hearts}
        lessonId={lessonId}
      />
    );
  }

  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.question;

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const handleSelect = (optionId: number) => {
    if (status === "none") {
      setSelectedOption(optionId);
    } else return;
  };

  const onContinue = () => {
    if (!selectedOption) return;
    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }
    const correctOption = options.find((option) => option.correct);

    if (!correctOption) return;

    if (correctOption && correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              console.error("Missing Hearts");
            }
            setStatus("correct");
            playCorrectSound();
            setPercentage((prev) => prev + 100 / challenges.length);

            // this is a practice
            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch((error) => {
            toast.error("Something went wrong please try again");
          });
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((res) => {
            if (res?.error === "hearts") {
              console.error("Missing hearts");
              return;
            }
            setStatus("wrong");
            playIncorrectSound();

            if (!res?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("Something went wrong please try again"));
      });
    }
  };

  return (
    <>
      {correctAudio}
      {incorrectAudio}
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-large lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            {challenge.type === "ASSIST" && (
              <QuestionBubble question={challenge.question} />
            )}
            <Challenge
              options={options}
              onSelect={handleSelect}
              status={status}
              selectedOption={selectedOption}
              disabled={pending}
              type={challenge.type}
            />
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};

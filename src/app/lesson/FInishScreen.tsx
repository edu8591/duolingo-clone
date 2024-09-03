import Image from "next/image";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useAudio, useWindowSize } from "react-use";
import { ResultCard } from "./ResultCard";
import { Footer } from "./Footer";
import { SelectChallenges } from "@/db";
type FinishScreenProps = {
  challenges: SelectChallenges[];
  hearts: number;
  lessonId: number;
};

export const FinishScreen = ({
  challenges,
  hearts,
  lessonId,
}: FinishScreenProps) => {
  const router = useRouter();
  const { width, height } = useWindowSize();
  const [finishAudio] = useAudio({
    src: "/audio/finish.mp3",
    autoPlay: true,
  });

  return (
    <>
      {finishAudio}
      <Confetti
        recycle={false}
        numberOfPieces={2000}
        tweenDuration={10000}
        width={width}
        height={height}
      />
      <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
        <Image
          src="/images/finish.svg"
          alt="Finish"
          className="hidden lg:block"
          height={100}
          width={100}
        />
        <Image
          src="/images/finish.svg"
          alt="Finish"
          className="block lg:hidden"
          height={50}
          width={50}
        />

        <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
          Great job!
          <br />
          {"You've completed the lesson."}
        </h1>
        <div className="flex items-center gap-x-4 w-full">
          <ResultCard variant="points" value={challenges.length * 10} />
          <ResultCard variant="hearts" value={hearts} />
        </div>
      </div>
      <Footer
        lessonId={lessonId}
        status="completed"
        onCheck={() => {
          router.push("/learn");
        }}
      />
    </>
  );
};

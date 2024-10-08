import { cn } from "@/lib/utils";
import Image from "next/image";

type ResultCardProps = {
  variant: "points" | "hearts";
  value: number;
};

export const ResultCard = ({ variant, value }: ResultCardProps) => {
  const imageSrc =
    variant === "points" ? "/images/points.svg" : "/images/heart.svg";
  return (
    <div
      className={cn(
        "rounded-2xl border-2 w-full",
        variant === "points" && "bg-orange-400 border-orange-400",
        variant === "hearts" && "bg-rose-400 border-rose-400"
      )}
    >
      <div
        className={cn(
          "p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
          variant === "hearts" && "bg-rose-500",
          variant === "points" && "bg-orange-500"
        )}
      >
        {variant === "hearts" ? "Hearts Left" : "Total XP"}
      </div>
      <div
        className={cn(
          "rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg",
          variant === "points" && "text-orange-500",
          variant === "hearts" && "text-rose-500"
        )}
      >
        <Image
          src={imageSrc}
          height={30}
          width={30}
          className="mr-1.5"
          alt={variant === "hearts" ? "Heart icon" : "Thunder icon"}
        />
        {value}
      </div>
    </div>
  );
};

import { SelectLessons, SelectUnits } from "@/db";
import { UnitBanner } from "./UnitBanner";
import { LessonButton } from "./LessonButton";

interface UnitProps {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (SelectLessons & { completed: boolean })[];
  activeLesson:
    | (SelectLessons & {
        unit: SelectUnits;
      })
    | undefined;
  activeLessonPercentage: number;
}

export const Unit = ({
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: UnitProps) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, i) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={i}
              locked={isLocked}
              totalCount={lessons.length - 1}
              current={isCurrent}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </>
  );
};

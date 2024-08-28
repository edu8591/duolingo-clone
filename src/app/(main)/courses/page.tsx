import { getCourses } from "@/db";
import { List } from "./List";

export default async function CoursesPage() {
  const data = await getCourses();
  return (
    <div className="h-full maw-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">Languages Courses</h1>
      <List courses={data} activeCourseId={1} />
    </div>
  );
}

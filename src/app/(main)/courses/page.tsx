import { getCourses, getUserProgress } from "@/db";
import { List } from "./List";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CoursesPage() {
  const [data, userProgress] = await Promise.all([
    getCourses(),
    getUserProgress(),
  ]);
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }
  return (
    <div className="h-full maw-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">Languages Courses</h1>
      <List courses={data} activeCourseId={userProgress?.activeCourseId} />
    </div>
  );
}

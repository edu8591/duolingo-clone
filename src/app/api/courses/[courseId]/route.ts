import { deleteCourse, getCourseById, updateCourse } from "@/db";
import { NextResponse } from "next/server";
import { authorize } from "@/lib/admin";

export const GET = async (
  _req: Request,
  { params }: { params: { courseId: number } }
) => {
  authorize();

  const course = await getCourseById(params.courseId);

  return NextResponse.json(course);
};

export const PUT = async (
  req: Request,
  { params }: { params: { courseId: number } }
) => {
  authorize();
  const body = await req.json();
  const data = await updateCourse(body, params.courseId);
  console.log("response:", { data: data[0] });
  return NextResponse.json(data[0]);
};

export const DELETE = async (
  _req: Request,
  { params }: { params: { courseId: number } }
) => {
  authorize();

  const data = await deleteCourse(params.courseId);
  return NextResponse.json(data[0]);
};

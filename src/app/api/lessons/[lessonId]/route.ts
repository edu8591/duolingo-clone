import { deleteLesson, getLessonById, updateLesson } from "@/db";
import { NextResponse } from "next/server";
import { authorize } from "@/lib/admin";

export const GET = async (
  _req: Request,
  { params }: { params: { lessonId: number } }
) => {
  authorize();

  const unit = await getLessonById(params.lessonId);

  return NextResponse.json(unit);
};

export const PUT = async (
  req: Request,
  { params }: { params: { lessonId: number } }
) => {
  authorize();
  const body = await req.json();
  const data = await updateLesson(body, params.lessonId);
  return NextResponse.json(data[0]);
};

export const DELETE = async (
  _req: Request,
  { params }: { params: { lessonId: number } }
) => {
  authorize();

  const data = await deleteLesson(params.lessonId);
  return NextResponse.json(data[0]);
};

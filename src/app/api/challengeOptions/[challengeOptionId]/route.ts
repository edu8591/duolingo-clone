import {
  deleteChallengeOption,
  getChallengeOptionById,
  updateChallengeOption,
} from "@/db";
import { NextResponse } from "next/server";
import { authorize } from "@/lib/admin";

export const GET = async (
  req: Request,
  { params }: { params: { challengeOptionId: number } }
) => {
  authorize();

  const data = await getChallengeOptionById(params.challengeOptionId);
  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: { challengeOptionId: number } }
) => {
  authorize();
  const body = await req.json();
  const data = await updateChallengeOption(body, params.challengeOptionId);
  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: { challengeOptionId: number } }
) => {
  authorize();

  const data = await deleteChallengeOption(params.challengeOptionId);
  return NextResponse.json(data[0]);
};

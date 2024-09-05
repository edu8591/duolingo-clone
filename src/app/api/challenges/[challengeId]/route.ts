import { deleteChallenge, getChallengeById, updateChallenge } from "@/db";
import { NextResponse } from "next/server";
import { authorize } from "@/lib/admin";

export const GET = async (
  _req: Request,
  { params }: { params: { challengeId: number } }
) => {
  authorize();

  const data = await getChallengeById(params.challengeId);
  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: { challengeId: number } }
) => {
  authorize();
  const body = await req.json();
  const data = await updateChallenge(body, params.challengeId);
  return NextResponse.json(data[0]);
};

export const DELETE = async (
  _req: Request,
  { params }: { params: { challengeId: number } }
) => {
  authorize();

  const data = await deleteChallenge(params.challengeId);
  return NextResponse.json(data[0]);
};

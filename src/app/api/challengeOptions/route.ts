import {
  getAllChallegneOptions,
  getAllChallenges,
  getAllUnits,
  insertChallenge,
  insertChallengeOption,
  insertUnit,
} from "@/db";
import { authorize } from "@/lib/admin";
import { NextResponse } from "next/server";

export const GET = async () => {
  authorize();
  const data = await getAllChallegneOptions();

  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  authorize();

  const body = await req.json();
  const data = await insertChallengeOption(body);

  return NextResponse.json(data[0]);
};

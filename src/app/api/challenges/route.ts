import { getAllChallenges, insertChallenge } from "@/db";
import { authorize } from "@/lib/admin";
import { NextResponse } from "next/server";

export const GET = async () => {
  authorize();
  const data = await getAllChallenges();

  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  authorize();

  const body = await req.json();
  const data = await insertChallenge(body);

  return NextResponse.json(data[0]);
};

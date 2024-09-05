import { getAllUnits, insertUnit } from "@/db";
import { authorize } from "@/lib/admin";
import { NextResponse } from "next/server";

export const GET = async () => {
  authorize();
  const units = await getAllUnits();

  return NextResponse.json(units);
};

export const POST = async (req: Request) => {
  authorize();

  const body = await req.json();
  const data = await insertUnit(body);

  return NextResponse.json(data[0]);
};

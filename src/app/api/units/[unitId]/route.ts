import { deleteUnit, getUnitById, updateUnit } from "@/db";
import { NextResponse } from "next/server";
import { authorize } from "@/lib/admin";

export const GET = async (
  _req: Request,
  { params }: { params: { unitId: number } }
) => {
  authorize();

  const unit = await getUnitById(params.unitId);
  console.log("unit", unit);
  return NextResponse.json(unit);
};

export const PUT = async (
  req: Request,
  { params }: { params: { unitId: number } }
) => {
  authorize();
  const body = await req.json();
  const data = await updateUnit(body, params.unitId);
  return NextResponse.json(data[0]);
};

export const DELETE = async (
  _req: Request,
  { params }: { params: { unitId: number } }
) => {
  authorize();

  const data = await deleteUnit(params.unitId);
  return NextResponse.json(data[0]);
};

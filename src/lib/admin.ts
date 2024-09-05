import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const getIsAdmin = () => {
  const { userId } = auth();
  if (!userId) return false;
  return userId === process.env.ADMIN_USER_ID;
};

export const authorize = () => {
  const isAdmin = getIsAdmin();

  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
};

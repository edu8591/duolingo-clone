import { db } from "@db";
import { auth } from "@clerk/nextjs/server";
import { userProgress } from "../schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const insertUserProgress = async (
  id: number,
  userId: string,
  username?: string | null,
  userImageSrc?: string
) => {
  // const { userId } = auth();
  // if (!userId) return null;

  await db.insert(userProgress).values({
    userId,
    activeCourseId: id,
    userName: username || "User",
    userImageSrc: userImageSrc || "/images/mascot.svg",
  });
  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};

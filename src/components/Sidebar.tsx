import { cn } from "@/lib/utils";
import Image from "next/image";
import { Brand } from "./Brand";
import Link from "next/link";
import { SidebarItem } from "./SidebarItem";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div
      className={cn(
        "flex flex-col h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 ",
        className
      )}
    >
      <Link href="/learn">
        <Brand />
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem label="Learn" iconSrc="/images/learn.svg" href="/learn" />
        <SidebarItem
          label="Leaderboard"
          iconSrc="/images/leaderboard.svg"
          href="/leaderboard"
        />
        <SidebarItem
          label="Quests"
          iconSrc="/images/quest.svg"
          href="/quests"
        />
        <SidebarItem label="Shop" iconSrc="/images/shop.svg" href="/shop" />
      </div>

      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton />
        </ClerkLoaded>
      </div>
    </div>
  );
};

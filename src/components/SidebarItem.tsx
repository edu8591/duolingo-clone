"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui";
import Link from "next/link";
import Image from "next/image";

interface SidebarItemProps {
  label: string;
  iconSrc: string;
  href: string;
}
export const SidebarItem = ({ label, iconSrc, href }: SidebarItemProps) => {
  const pathName = usePathname();
  const isActive = pathName === href;
  return (
    <Button
      variant={isActive ? "sidebarOutline" : "sidebar"}
      asChild
      className="justify-start h-[52px]"
    >
      <Link href={href}>
        <Image
          src={iconSrc}
          alt={label}
          className="mr-5"
          height={32}
          width={32}
        />
        {label}
      </Link>
    </Button>
  );
};

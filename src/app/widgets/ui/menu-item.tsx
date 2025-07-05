"use client";

import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";
import { cn } from "@/shared/ui/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MenuItem({
  link,
  name,
  icon: Icon,
  action
}: {
  link: string;
  name: string;
  icon: LucideIcon;
  action: () => void;
}) {
  const pathname = usePathname();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className={cn(
          pathname.startsWith(link) &&
          "bg-sidebar-accent text-sidebar-accent-foreground",
          "truncate whitespace-nowrap overflow-hidden",
        )}
        asChild
      >
        <Link href={link} onClick={action}>
          <Icon />
          {name}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

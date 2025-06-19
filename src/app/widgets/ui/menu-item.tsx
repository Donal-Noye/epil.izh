"use client";

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/ui/sidebar";
import { cn } from "@/shared/ui/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MenuItem({
  link,
  name,
  icon: Icon,
}: {
  link: string;
  name: string;
  icon: LucideIcon;
}) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className={cn(
          pathname === link &&
            "bg-sidebar-accent text-sidebar-accent-foreground",
          "truncate whitespace-nowrap overflow-hidden",
        )}
        asChild
      >
        <Link href={link} onClick={() => setOpenMobile(false)}>
          <Icon />
          {name}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

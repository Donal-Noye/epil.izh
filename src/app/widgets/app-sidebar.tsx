import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu, SidebarMenuButton,
  SidebarMenuItem
} from "@/shared/ui/sidebar";
import { Logo } from "@/app/widgets/ui/logo";
import Link from "next/link";
import { Notebook, Tag } from "lucide-react";
import { ToggleTheme } from "@/features/theme/toggle-theme";
import { ProfileMenu } from "@/services/user/profile";

const navItems = [
  {
    name: "Записи",
    icon: <Notebook />,
    link: "/records"
  },
  {
    name: "Услуги",
    icon: <Tag />,
    link: "/services"
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row items-center justify-between">
        <Logo />
        <ToggleTheme className="group-data-[collapsible=icon]:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item, idx) => (
              <SidebarMenuItem key={idx}>
                <SidebarMenuButton asChild>
                  <Link href={item.link}>
                    {item.icon}
                    {item.name}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <ProfileMenu triggerVariant="ghost" className="justify-start py-6" />
      </SidebarFooter>
    </Sidebar>
  );
}
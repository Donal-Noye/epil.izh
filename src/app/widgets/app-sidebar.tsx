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
import { Profile } from "@/services/user/user";
import Link from "next/link";
import { Notebook, Tag, User } from "lucide-react";
import { DropdownMenuItem } from "@/shared/ui/dropdown-menu";
import { ToggleTheme } from "@/features/theme/toggle-theme";

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
        <Profile triggerVariant="ghost" className="justify-start py-6">
          <DropdownMenuItem asChild>
            <Link href="/profile/me">
              <User className="mr-2 h-4 w-4" />
              <span>Профиль</span>
            </Link>
          </DropdownMenuItem>
        </Profile>
      </SidebarFooter>
    </Sidebar>
  )
}
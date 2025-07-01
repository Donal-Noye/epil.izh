"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from "@/shared/ui/sidebar";
import { Logo } from "@/app/widgets/ui/logo";
import { ToggleTheme } from "@/features/theme/toggle-theme";
import { ProfileMenu, useRole } from "@/entities/user/profile";
import { MenuItem } from "@/app/widgets/ui/menu-item";
import { AppRoute, ROUTES } from "@/shared/config/public";
import { Role } from "@/kernel/domain/user";

export function AppSidebar() {
  const role = useRole()
  const { setOpenMobile } = useSidebar();

  const navItems: AppRoute[] = Object.values(ROUTES).filter(
    (r) => {
      if (!r.showInSidebar) return false;

      if (!r.roles) return true;

      if (!role) return false;

      return (r.roles as Role[]).includes(role);
    }
  );

  const handleClick = () => setOpenMobile(false);

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
              <MenuItem
                key={idx}
                name={item.label}
                icon={item.icon}
                link={item.path}
                action={handleClick}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <ProfileMenu
          onClick={handleClick}
          triggerVariant="ghost"
          className="justify-start py-6"
        />
      </SidebarFooter>
    </Sidebar>
  );
}

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
} from "@/shared/ui/sidebar";
import { Logo } from "@/app/widgets/ui/logo";
import { ToggleTheme } from "@/features/theme/toggle-theme";
import { ProfileMenu } from "@/entities/user/profile";
import { MenuItem } from "@/app/widgets/ui/menu-item";
import { appRoutes } from "@/shared/config/public";

const navItems = appRoutes.filter((r) => r.showInSidebar);

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
              <MenuItem
                key={idx}
                name={item.label}
                icon={item.icon}
                link={item.path}
              />
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

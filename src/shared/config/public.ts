import {
  Notebook,
  Tag,
  Users,
  User,
  LayoutDashboard,
  SettingsIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Role } from "@/kernel/domain/user";

export type AppRoute = {
	path: string;
	label: string;
	icon: LucideIcon;
	showInSidebar?: boolean;
  roles?: Role[]
};

export const ROUTES = {
  admin: {
    path: "/dashboard",
    label: "Дашборд",
    icon: LayoutDashboard,
    showInSidebar: true,
    roles: ["ADMIN", "SPECIALIST"]
  },
  adminPanel: {
    path: "/admin",
    label: "Админ-панель",
    icon: SettingsIcon,
    showInSidebar: true,
    roles: ["ADMIN"],
  },
  records: {
    path: "/records",
    label: "Мои записи",
    icon: Notebook,
    showInSidebar: true,
    roles: ["ADMIN", "SPECIALIST", "USER"]
  },
  createRecord: {
    path: "/records/create",
    label: "Создание записи",
    icon: Notebook,
    showInSidebar: false,
    roles: ["ADMIN", "SPECIALIST", "USER"]
  },
  services: {
    path: "/services",
    label: "Услуги",
    icon: Tag,
    showInSidebar: true,
    roles: ["ADMIN", "SPECIALIST", "USER"]
  },
  specialists: {
    path: "/specialists",
    label: "Специалисты",
    icon: Users,
    showInSidebar: true,
    roles: ["ADMIN", "SPECIALIST", "USER"]
  },
  profile: {
    path: "/profile",
    label: "Профиль",
    icon: User,
    showInSidebar: false,
    roles: ["ADMIN", "SPECIALIST", "USER"]
  },
} satisfies Record<string, AppRoute>;



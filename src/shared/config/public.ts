import { Notebook, Tag, Users, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type AppRoute = {
	path: string;
	label: string;
	icon: LucideIcon;
	showInSidebar?: boolean;
};

export const ROUTES = {
  records: {
    path: "/records",
    label: "Мои записи",
    icon: Notebook,
    showInSidebar: true,
  },
  createRecord: {
    path: "/records/create",
    label: "Создание записи",
    icon: Notebook,
    showInSidebar: false,
  },
  services: {
    path: "/services",
    label: "Услуги",
    icon: Tag,
    showInSidebar: true,
  },
  specialists: {
    path: "/specialists",
    label: "Специалисты",
    icon: Users,
    showInSidebar: true,
  },
  profile: {
    path: "/profile",
    label: "Профиль",
    icon: User,
    showInSidebar: false,
  },
} satisfies Record<string, AppRoute>;



import { Notebook, Tag, Users, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type AppRoute = {
	path: string;
	label: string;
	icon: LucideIcon;
	showInSidebar?: boolean;
};

export const appRoutes: AppRoute[] = [
	{
		path: "/records",
		label: "Мои записи",
		icon: Notebook,
		showInSidebar: true,
	},
	{
		path: "/services",
		label: "Услуги",
		icon: Tag,
		showInSidebar: true,
	},
	{
		path: "/specialists",
		label: "Специалисты",
		icon: Users,
		showInSidebar: true,
	},
	{
		path: "/profile",
		label: "Профиль",
		icon: User,
		showInSidebar: false,
	},
];

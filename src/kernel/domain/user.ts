export type UserId = string;
export type Role = "ADMIN" | "USER" | "SPECIALIST";

export const ROLES: Record<Role, Role> = {
	ADMIN: "ADMIN",
	USER: "USER",
	SPECIALIST: "SPECIALIST"
};

export type SharedUser = {
	id: UserId;
	email: string;
	emailVerified?: Date | null;
	role: Role;
	name?: string | null;
	image?: string | null;
	phone?: string | null;
};

export type SharedSession = {
	user: {
		id: UserId;
		email: string;
		role: Role;
		name?: string | null;
		image?: string | null;
		phone?: string | null;
	};
	expires: string;
};
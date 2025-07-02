import { SharedSession, UserId } from "@/kernel/domain/user";

export const createUserAbility = (session: SharedSession) => ({
  canGetUser: (userId: UserId) =>
    session.user.id === userId ||
    session.user.role === "ADMIN" ||
    session.user.role === "SPECIALIST",
  canRemoveUser: (userId: UserId) =>
    session.user.id === userId ||
    session.user.role === "ADMIN" ||
    session.user.role === "SPECIALIST",
});

export const createProfileAbility = (session: SharedSession) => ({
  canUpdateProfile: (userId: UserId) =>
    session.user.id === userId ||
    session.user.role === "ADMIN"
});

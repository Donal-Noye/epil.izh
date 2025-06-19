import { UserId } from "@/kernel/domain/user";

export type SpecialistEntity = {
  id: string;
  userId: UserId;
  name: string;
  position?: string | null;
  bio?: string | null;
  image?: string | null;
};

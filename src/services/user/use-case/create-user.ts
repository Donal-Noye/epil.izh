import { ROLES, SharedUser } from "@/kernel/domain/user";
import { userRepository } from "@/services/user/repositories/user";
import { createId } from "@/shared/lib/id";
import { privateConfig } from "@/shared/config/private";

type CreateUser = {
  email: string;
  name?: string | null;
  image?: string | null;
  phone?: string | null;
  emailVerified?: Date | null;
};

export class CreateUserUseCase {
  async exec(data: CreateUser) {
    const adminEmails = privateConfig.ADMIN_EMAILS?.split(",") ?? []
    const specialistEmails = privateConfig.SPECIALIST_EMAILS?.split(",") ?? [];

    let role = ROLES.USER;

    if (adminEmails.includes(data.email)) {
      role = ROLES.ADMIN;
    } else if (specialistEmails.includes(data.email)) {
      role = ROLES.SPECIALIST;
    }

    const user: SharedUser = {
      id: createId(),
      role,
      ...data,
    };

    return await userRepository.createUser(user);
  }
}

export const createUserUseCase = new CreateUserUseCase();
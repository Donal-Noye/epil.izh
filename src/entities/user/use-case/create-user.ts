import { ROLES, SharedUser } from "@/kernel/domain/user";
import { userRepository } from "@/entities/user/repositories/user";
import { createId } from "@/shared/lib/id";
import { privateConfig } from "@/shared/config/private";
import { specialistRepository } from "@/entities/specialist/specialist";
import { CreateUser } from "@/entities/user/domain/types";

export class CreateUserUseCase {
  async exec(data: CreateUser) {
    const adminEmails = privateConfig.ADMIN_EMAILS?.split(",") ?? [];
    const specialistEmails = privateConfig.SPECIALIST_EMAILS?.split(",") ?? [];

    let role = ROLES.USER;

    if (adminEmails.includes(data.email)) {
      role = ROLES.ADMIN;
    } else if (specialistEmails.includes(data.email)) {
      role = ROLES.SPECIALIST;
    }

    const userId = createId();

    const user: SharedUser = {
      id: userId,
      role,
      ...data,
    };

    const createdUser = await userRepository.createUser(user);

    if (role === ROLES.SPECIALIST) {
      try {
        await specialistRepository.create({
          id: createId(),
          userId: user.id,
          name: data.name ?? "Специалист",
          bio: null,
          image: data.image,
        });
      } catch (err) {
        console.error("Failed to create specialist:", err);
      }
    }

    return createdUser;
  }
}

export const createUserUseCase = new CreateUserUseCase();

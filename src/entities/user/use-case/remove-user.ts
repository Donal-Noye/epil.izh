import { SharedSession, SharedUser, UserId } from "@/kernel/domain/user";
import { userRepository } from "@/entities/user/repositories/user";
import { createUserAbility } from "@/kernel/domain/ability";
import { AuthorizationError } from "@/shared/lib/errors";

type GetUser = {
  userId: UserId;
  session: SharedSession;
};

class RemoveUserUseCase {
  async exec({ userId, session }: GetUser): Promise<SharedUser> {
    const targetUser = await userRepository.getUserById(userId);

    if (targetUser.role === "ADMIN") {
      throw new AuthorizationError("Нельзя удалить администратора");
    }

    const userAbility = createUserAbility(session);

    if (!userAbility.canRemoveUser(userId)) {
      throw new AuthorizationError();
    }

    return userRepository.removeUser(userId);
  }
}

export const removeUserUseCase = new RemoveUserUseCase();

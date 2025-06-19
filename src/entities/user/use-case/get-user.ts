import {SharedSession, SharedUser, UserId} from "@/kernel/domain/user";
import { userRepository } from "@/entities/user/repositories/user";
import { createUserAbility } from "@/entities/user/domain/ability";
import { AuthorizationError } from "@/shared/lib/errors";

type GetUser = {
  userId: UserId;
  session: SharedSession;
};

export class GetUserUseCase {
  async exec({ userId, session }: GetUser): Promise<SharedUser> {
    const userAbility = createUserAbility(session);

    if (!userAbility.canGetUser(userId)) {
      throw new AuthorizationError()
    }

    return await userRepository.getUserById(userId);
  }
}

export const getUserUseCase = new GetUserUseCase();

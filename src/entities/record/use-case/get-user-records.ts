import { SharedSession, UserId } from "@/kernel/domain/user";
import { createUserAbility } from "@/entities/user/domain/ability";
import { AuthorizationError } from "@/shared/lib/errors";
import { recordRepository } from "@/entities/record/repositories/record";

type GetUserRecord = {
  userId: UserId;
  session: SharedSession;
};

class GetUserRecordsUseCase {
  async exec({userId, session}: GetUserRecord) {
    const userAbility = createUserAbility(session);

    if (!userAbility.canGetUser(userId)) {
      throw new AuthorizationError()
    }

    return recordRepository.getUserRecords(userId)
  }
}

export const getUserRecordsUseCase = new GetUserRecordsUseCase();
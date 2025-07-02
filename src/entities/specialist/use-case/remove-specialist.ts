import { SpecialistEntity } from "@/entities/specialist/domain/types";
import { specialistRepository } from "@/entities/specialist/repository/specialist";
import {SharedSession} from "@/kernel/domain/user";
import {createUserAbility} from "@/kernel/domain/ability";
import {AuthorizationError} from "@/shared/lib/errors";

type RemoveSpecialist = {
  specialistId: string;
  session: SharedSession
};

class RemoveSpecialistUseCase {
  exec({ specialistId, session }: RemoveSpecialist): Promise<SpecialistEntity> {
    const userAbility = createUserAbility(session);

    if (!userAbility.canRemoveUser(specialistId)) {
      throw new AuthorizationError()
    }

    return specialistRepository.remove(specialistId);
  }
}

export const removeSpecialistUseCase = new RemoveSpecialistUseCase();

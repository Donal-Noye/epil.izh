import { SharedSession, UserId } from "@/kernel/domain/user";
import { createProfileAbility } from "@/kernel/domain/ability";
import { AuthorizationError } from "@/shared/lib/errors";
import { Profile } from "@/entities/user/domain/types";
import { profileRepository } from "@/entities/user/repositories/profile";

type UpdateProfile = {
  userId: UserId;
  data: Partial<Profile>;
  session: SharedSession;
};

export class UpdateProfileUseCase {
  async exec({ userId, data, session }: UpdateProfile): Promise<Profile> {
    const profileAbility = createProfileAbility(session);

    if (!profileAbility.canUpdateProfile(userId)) {
      throw new AuthorizationError();
    }

    return await profileRepository.update(userId, data);
  }
}

export const updateProfileUseCase = new UpdateProfileUseCase();

import { SharedSession, UserId } from "@/kernel/domain/user";
import { createProfileAbility } from "@/services/user/domain/ability";
import { AuthorizationError } from "@/shared/lib/errors";
import { Profile } from "@/services/user/domain/types";
import { profileRepository } from "@/services/user/repositories/profile";

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

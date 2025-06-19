import { UserId } from "@/kernel/domain/user";
import { Profile } from "@/entities/user/domain/types";
import { dbClient } from "@/shared/lib/db";

export class ProfileRepository {
  async update(userId: UserId, data: Partial<Profile>): Promise<Profile> {
    return dbClient.user.update({
      where: { id: userId },
      data
    });
  }
}

export const profileRepository = new ProfileRepository()
import { SharedUser } from "@/kernel/domain/user";
import { dbClient } from "@/shared/lib/db";

export class UserRepository {
  async createUser(user: SharedUser): Promise<SharedUser> {
    return dbClient.user.create({
      data: user
    });
  }
}

export const userRepository = new UserRepository();
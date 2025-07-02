import { SharedUser, UserId } from "@/kernel/domain/user";
import { dbClient } from "@/shared/lib/db";

export class UserRepository {
  async getAllUsers(): Promise<SharedUser[]> {
    return dbClient.user.findMany({});
  }

  async getUserById(userId: UserId): Promise<SharedUser> {
    return dbClient.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
  }

  async createUser(user: SharedUser): Promise<SharedUser> {
    return dbClient.user.create({
      data: user,
    });
  }
}

export const userRepository = new UserRepository();

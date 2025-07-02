import { userRepository } from "@/entities/user/repositories/user";

class GetAllUsersUseCase {
  exec() {
    return userRepository.getAllUsers()
  }
}

export const getAllUsersUseCase = new GetAllUsersUseCase();
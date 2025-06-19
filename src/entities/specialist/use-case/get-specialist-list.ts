import { specialistRepository } from "@/entities/specialist/repository/specialist";

class GetSpecialistListUseCase {
  async exec() {
    return specialistRepository.getSpecialistList();
  }
}

export const getSpecialistListUseCase = new GetSpecialistListUseCase();

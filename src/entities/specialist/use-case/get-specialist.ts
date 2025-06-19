import { SpecialistEntity } from "@/entities/specialist/domain/types";
import { specialistRepository } from "@/entities/specialist/repository/specialist";

type GetSpecialist = {
  id: string;
};

export class GetSpecialistUseCase {
  async exec({ id }: GetSpecialist): Promise<SpecialistEntity> {
    return await specialistRepository.getSpecialistById(id);
  }
}

export const getSpecialistUseCase = new GetSpecialistUseCase();

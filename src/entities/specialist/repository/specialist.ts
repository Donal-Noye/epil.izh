import { SpecialistEntity } from "@/entities/specialist/domain/types";
import { dbClient } from "@/shared/lib/db";

class SpecialistRepository {
  async create(data: SpecialistEntity) {
    return dbClient.specialist.create({ data });
  }

  async remove(specialistId: string): Promise<SpecialistEntity> {
    return dbClient.specialist.delete({ where: { id: specialistId } });
  }

  async getSpecialistById(specialistId: string): Promise<SpecialistEntity> {
    return dbClient.specialist.findFirstOrThrow({
      where: {
        id: specialistId,
      },
    });
  }

  async getSpecialistList() {
    return dbClient.specialist.findMany();
  }
}

export const specialistRepository = new SpecialistRepository();

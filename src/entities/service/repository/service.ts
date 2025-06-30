import { ServiceEntity } from "@/entities/service/domain/types";
import { dbClient } from "@/shared/lib/db";

class ServiceRepository {
  async getById(id: string): Promise<ServiceEntity> {
    return dbClient.service.findFirstOrThrow({ where: { id } });
  }

  async getAll(): Promise<ServiceEntity[]> {
    return dbClient.service.findMany();
  }
}

export const serviceRepository = new ServiceRepository();
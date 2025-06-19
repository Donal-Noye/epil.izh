import { serviceRepository } from "@/entities/service/repository/service";

class GetServiceListUseCase {
  async exec() {
    return serviceRepository.getAll()
  }
}

export const getServiceListUseCase = new GetServiceListUseCase();
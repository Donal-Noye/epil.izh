import { serviceRepository } from "@/entities/service/repository/service";

class GetServiceUseCase {
  exec({ serviceId }: { serviceId: string }) {
    return serviceRepository.getById(serviceId);
  }
}

export const getServiceUseCase = new GetServiceUseCase();

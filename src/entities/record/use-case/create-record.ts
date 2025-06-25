import { recordRepository } from "@/entities/record/repositories/record";
import { RecordStatus } from "@prisma/client";

type CreateRecord = {
  id: string;
  userId: string;
  specialistId: string;
  serviceId: string;
  date: Date;
  status: RecordStatus;
  notes?: string | null;
};

class CreateRecordUseCase {
  async exec(data: CreateRecord) {
    return recordRepository.create(data)
  }
}

export const createRecordUseCase = new CreateRecordUseCase();
import { recordRepository } from "@/entities/record/repositories/record";

class GetAllRecordsUseCase {
  exec() {
    return recordRepository.getAllRecords()
  }
}

export const getAllRecordsUseCase = new GetAllRecordsUseCase();
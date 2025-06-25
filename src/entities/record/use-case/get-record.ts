import { recordRepository } from "@/entities/record/repositories/record";

class GetRecordUseCase {
  async exec({ userId }: { userId: string; }) {
    return recordRepository.getRecordById(userId);
  }
}

export const getRecordUseCase = new GetRecordUseCase();

import { recordRepository } from "@/entities/record/repositories/record";

export class GetRecordUseCase {
  async exec({ recordId }: { recordId: string }) {
    return await recordRepository.getRecordById(recordId);
  }
}

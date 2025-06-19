import { RecordEntity } from "@/entities/record/domain/types";
import { dbClient } from "@/shared/lib/db";

export class RecordRepository {
  async create(record: RecordEntity): Promise<RecordEntity> {
    return dbClient.record.create({
      data: record,
    });
  }

  async getRecordById(recordId: string): Promise<RecordEntity> {
    return dbClient.record.findUniqueOrThrow({
      where: { id: recordId },
    });
  }
}

export const recordRepository = new RecordRepository();
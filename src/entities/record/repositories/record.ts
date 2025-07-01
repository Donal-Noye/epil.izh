import { RecordEntity } from "@/entities/record/domain/types";
import { dbClient } from "@/shared/lib/db";
import { UserId } from "@/kernel/domain/user";

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

  async getUserRecords(userId: UserId): Promise<RecordEntity[]> {
    return dbClient.record.findMany({ where: { userId: userId } });
  }

  async getAllRecords(): Promise<RecordEntity[]> {
    return dbClient.record.findMany();
  }
}

export const recordRepository = new RecordRepository();

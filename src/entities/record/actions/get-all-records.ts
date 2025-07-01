"use server";

import { z } from "zod";
import { recordSchema } from "@/entities/record/domain/schemas";
import { getAllRecordsUseCase } from "@/entities/record/use-case/get-all-records";

const resultSchema = z.object({
  records: z.array(recordSchema),
});

export const getAllRecordsAction = async () => {
  const records = await getAllRecordsUseCase.exec();

  return resultSchema.parseAsync({
    records,
  });
};

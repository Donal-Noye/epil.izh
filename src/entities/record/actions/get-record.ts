"use server";

import { z } from "zod";
import { getRecordUseCase } from "@/entities/record/use-case/get-record";
import { recordSchema } from "@/entities/record/domain/schemas";

const propsSchema = z.object({
  userId: z.string(),
});

const resultSchema = z.object({
  record: recordSchema,
});

export const getRecordAction = async (props: z.infer<typeof propsSchema>) => {
  const { userId } = propsSchema.parse(props);

  const record = await getRecordUseCase.exec({
    userId,
  });

  return resultSchema.parseAsync({
    record,
  });
};

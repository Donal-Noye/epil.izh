"use server";

import { z } from "zod";
import { recordSchema } from "@/entities/record/domain/schemas";
import { getAppSessionStrictServer } from "@/kernel/lib/next-auth/server";
import { getUserRecordsUseCase } from "@/entities/record/use-case/get-user-records";

const propsSchema = z.object({
  userId: z.string(),
});

const resultSchema = z.object({
  userRecords: z.array(recordSchema),
});

export const getUserRecordsAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  const { userId } = propsSchema.parse(props);
  const session = await getAppSessionStrictServer();

  const records = await getUserRecordsUseCase.exec({
    userId,
    session,
  });

  return resultSchema.parseAsync({
    userRecords: records,
  });
};

"use server";

import { getUserUseCase } from "@/entities/user/use-case/get-user";
import { z } from "zod";
import { getAppSessionStrictServer } from "@/kernel/lib/next-auth/server";

const propsSchema = z.object({
  userId: z.string(),
});

const recordSchema = z.object({
  email: z.string(),
  name: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
});

const resultSchema = z.object({
  record: recordSchema,
});

export const getRecordAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  const { userId } = propsSchema.parse(props);
  const session = await getAppSessionStrictServer();

  const user = await getUserUseCase.exec({
    userId,
    session,
  });

  return resultSchema.parseAsync({
    profile: user
  });
};

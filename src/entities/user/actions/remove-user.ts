"use server";

import { z } from "zod";
import { userSchema } from "@/kernel/domain/schema";
import { removeUserUseCase } from "@/entities/user/use-case/remove-user";
import { getAppSessionStrictServer } from "@/kernel/lib/next-auth/server";

const propsSchema = z.object({
  userId: z.string(),
});

const resultSchema = z.object({
  user: userSchema,
});

export const removeUserAction = async (props: z.infer<typeof propsSchema>) => {
  const { userId } = propsSchema.parse(props);
  const session = await getAppSessionStrictServer();

  const user = await removeUserUseCase.exec({ userId, session });

  return resultSchema.parseAsync({
    user,
  });
};

"use server";

import { getUserUseCase } from "@/services/user/use-case/get-user";
import { z } from "zod";
import { profileSchema } from "@/services/user/domain/schema";
import { getAppSessionStrictServer } from "@/kernel/lib/next-auth/server";

const propsSchema = z.object({
  userId: z.string(),
});

const resultSchema = z.object({
  profile: profileSchema,
});

export const getUserProfileAction = async (
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

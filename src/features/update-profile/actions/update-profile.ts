"use server"

import { z } from "zod";
import { profileSchema } from "@/entities/user/profile";
import { getAppSessionStrictServer } from "@/kernel/lib/next-auth/server";
import { updateProfileUseCase } from "@/entities/user/profile.server";

const propsSchema = z.object({
  userId: z.string(),
  data: profileSchema.partial()
});

const resultSchema = z.object({
  profile: profileSchema,
});

export const updateProfileAction = async (props: z.infer<typeof propsSchema>) => {
  const { userId, data } = propsSchema.parse(props);
  const session = await getAppSessionStrictServer();

  const user = await updateProfileUseCase.exec({
    userId,
    data,
    session,
  });

  console.log(session);

  return resultSchema.parseAsync({
    profile: user
  });
}
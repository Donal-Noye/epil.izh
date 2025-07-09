"use server";

import { z } from "zod";
import { specialistSchema } from "@/entities/specialist/domain/schemas";
import { getAppSessionStrictServer } from "@/kernel/lib/next-auth/server";
import { removeSpecialistUseCase } from "@/entities/specialist/use-case/remove-specialist";

const propsSchema = z.object({
  specialistId: z.string(),
});

const resultSchema = z.object({
  specialist: specialistSchema,
});

export const removeSpecialistAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  const { specialistId } = propsSchema.parse(props);
  const session = await getAppSessionStrictServer();

  const specialist = await removeSpecialistUseCase.exec({
    specialistId,
    session,
  });

  return resultSchema.parseAsync({
    specialist,
  });
};

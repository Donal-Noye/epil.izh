"use server";

import { z } from "zod";
import { getSpecialistUseCase } from "@/entities/specialist/use-case/get-specialist";
import { specialistSchema } from "@/entities/specialist/domain/schemas";

const propsSchema = z.object({
  id: z.string(),
});

const resultSchema = z.object({
  profile: specialistSchema,
});

export const getSpecialistAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  const { id } = propsSchema.parse(props);

  const specialist = await getSpecialistUseCase.exec({ id });

  return resultSchema.parseAsync({
    specialist: specialist,
  });
};

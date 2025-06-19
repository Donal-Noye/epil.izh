"use server";

import { z } from "zod";
import { getSpecialistListUseCase } from "@/entities/specialist/use-case/get-specialist-list";
import { specialistSchema } from "@/entities/specialist/domain/schemas";

const resultSchema = z.object({
  specialistList: z.array(specialistSchema),
});

export const getSpecialistListAction = async () => {
  const specialistList = await getSpecialistListUseCase.exec();

  return resultSchema.parseAsync({
    specialistList,
  });
};

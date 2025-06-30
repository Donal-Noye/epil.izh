"use server";

import { z } from "zod";
import { serviceSchema } from "@/entities/service/domain/schemas";
import { getServiceUseCase } from "../use-case/get-service";

const resultSchema = z.object({
  service: serviceSchema,
});

export const getServiceAction = async ({
  serviceId,
}: {
  serviceId: string;
}) => {
  const service = await getServiceUseCase.exec({ serviceId });

  return await resultSchema.parseAsync({
    service,
  });
};

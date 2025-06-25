"use server";

import { z } from "zod";
import { serviceSchema } from "@/entities/service/domain/schemas";
import { getServiceListUseCase } from "@/entities/service/use-case/get-service-list";

const resultSchema = z.object({
  serviceList: z.array(serviceSchema),
});

export const getServiceListAction = async () => {
  const serviceList = await getServiceListUseCase.exec();

  return await resultSchema.parseAsync({
    serviceList,
  });
};

"use server";

import { z } from "zod";
import { getAppSessionStrictServer } from "@/kernel/lib/next-auth/server";
import { createRecordUseCase } from "@/entities/record/use-case/create-record";
import { RecordStatus } from "@prisma/client";

const propsSchema = z.object({
  id: z.string(),
  specialistId: z.string(),
  serviceId: z.string(),
  date: z.coerce.date(),
  notes: z.string().nullable().optional(),
});

const resultSchema = z.object({
  success: z.literal(true),
});

export const createRecordAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  const { specialistId, serviceId, date, notes, id } = propsSchema.parse(props);
  const session = await getAppSessionStrictServer();
  const userId = session.user.id;

  await createRecordUseCase.exec({
    id,
    userId,
    specialistId,
    serviceId,
    date,
    status: RecordStatus.SCHEDULED,
    notes,
  });

  return resultSchema.parse({ success: true });
};

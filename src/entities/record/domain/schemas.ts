import { z } from "zod";

export const recordSchema = z.object({
  id: z.string(),
  userId: z.string(),
  specialistId: z.string(),
  serviceId: z.string(),
  date: z.coerce.date(),
  status: z.enum(["SCHEDULED", "COMPLETED", "CANCELLED", "NO_SHOW"]),
  notes: z.string().nullable().optional(),
});
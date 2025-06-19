import { z } from "zod";

export const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  durationMin: z.number(),
});

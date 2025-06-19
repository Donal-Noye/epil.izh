import { z } from "zod";

export const specialistSchema = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  position: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
});

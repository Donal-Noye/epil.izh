import { z } from "zod";

export const roleEnum = z.enum(["ADMIN", "USER", "SPECIALIST"]);

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  emailVerified: z.union([z.string().datetime(), z.null()]).optional(),
  role: roleEnum,
  name: z.string().nullable().optional(),
  image: z.string().url().nullable().optional(),
  phone: z.string().nullable().optional(),
});
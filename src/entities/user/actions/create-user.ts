"use server";

import { z } from "zod";
import { userSchema } from "@/kernel/domain/schema";
import { createUserUseCase } from "@/entities/user/use-case/create-user";

const propsSchema = z.object({
  email: z.string().email(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  emailVerified: z.date().optional().nullable(),
});

const resultSchema = z.object({
  user: userSchema,
});

export const createUserAction = async (props: z.infer<typeof propsSchema>) => {
  const { email, name, emailVerified, phone, image } = propsSchema.parse(props);

  const user = await createUserUseCase.exec({
    email,
    name,
    emailVerified,
    phone,
    image,
  });

  return resultSchema.parseAsync({
    user,
  });
};

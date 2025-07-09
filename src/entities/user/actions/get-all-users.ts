"use server";

import { z } from "zod";
import { userSchema } from "@/kernel/domain/schema";
import { getAllUsersUseCase } from "@/entities/user/use-case/get-all-users";

const resultSchema = z.object({
  users: z.array(userSchema),
});

export const getAllUsersAction = async () => {
  const users = await getAllUsersUseCase.exec();

  return resultSchema.parseAsync({
    users,
  });
};

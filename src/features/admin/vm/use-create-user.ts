import { useMutation } from "@tanstack/react-query";
import { CreateUser } from "@/entities/user/user";
import { createUserAction } from "@/entities/user/user.server";

export const useCreateUserMutation = () =>
  useMutation({
    mutationFn: async (props: CreateUser) => await createUserAction(props),
  });

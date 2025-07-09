import { useMutation } from "@tanstack/react-query";
import { removeUserAction } from "@/entities/user/user.server";
import { UserId } from "@/kernel/domain/user";
import { useInvalidateUsers } from "@/entities/user/user";

export const useRemoveUserMutation = () => {
  const invalidateUsers = useInvalidateUsers();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (userId: UserId) => await removeUserAction({ userId }),
    async onSuccess() {
      await invalidateUsers();
    },
  });

  return {
    remove: mutateAsync,
    isPending,
  };
};

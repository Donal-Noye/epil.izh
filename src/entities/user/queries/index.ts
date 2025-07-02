import { UserId } from "@/kernel/domain/user";
import { getUserProfileAction } from "@/entities/user/actions/get-user-profile";
import { useQueryClient } from "@tanstack/react-query";
import { getAllUsersAction } from "@/entities/user/actions/get-all-users";

const baseKey = "user";

export const getProfileQuery = (userId: UserId) => ({
  queryKey: [baseKey, "getProfileById", userId],
  queryFn: () => getUserProfileAction({ userId }),
});

export const getAllUsersQuery = () => ({
  queryKey: [baseKey, "getAllUsers"],
  queryFn: getAllUsersAction,
});

export const useInvalidateProfile = () => {
  const queryClient = useQueryClient();

  return (userId: UserId) =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getProfileById", userId],
    });
};

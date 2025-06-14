import { UserId } from "@/kernel/domain/user";
import { getUserProfileAction } from "@/services/user/actions/get-user-profile";

const baseKey = "user";

export const getProfileQuery = (userId: UserId) => ({
  queryKey: [baseKey, "getProfileById", userId],
  queryFn: () => getUserProfileAction({ userId }),
});

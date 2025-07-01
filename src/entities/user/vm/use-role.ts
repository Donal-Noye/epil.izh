import { useAppSession } from "@/kernel/lib/next-auth/client";

export const useRole = () => {
  const session = useAppSession();
  return session?.data?.user?.role;
};
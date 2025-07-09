import { SharedUser } from "@/kernel/domain/user";
import { useMemo } from "react";
import { useDebounce } from "use-debounce";

export function useFilteredUsers(users: SharedUser[] = [], search: string) {
  const [debounced] = useDebounce(search, 300);
  return useMemo(() => {
    if (!debounced) return users;
    const lower = debounced.toLowerCase();
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(lower) ||
        u.email.toLowerCase().includes(lower) ||
        u.phone?.toLowerCase().includes(lower)
    );
  }, [users, debounced]);
}


import { Users } from "@/features/admin/ui/users";
import {Specialists} from "@/features/admin/ui/specialists";

export function Admin() {
  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <Users />
        <Specialists />
      </div>
    </>
  )
}
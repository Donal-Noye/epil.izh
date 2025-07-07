import { getProfileLetters } from "@/entities/user/profile";
import { SharedUser, UserId } from "@/kernel/domain/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { ROUTES } from "@/shared/config/public";
import { Pen, Trash } from "lucide-react";

export function UsersTable({
  users,
  isRemoving,
  onRemove,
}: {
  users: SharedUser[];
  isRemoving: boolean;
  onRemove: (id: UserId, name: string) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]" />
          <TableHead>Имя</TableHead>
          <TableHead>Почта</TableHead>
          <TableHead>Телефон</TableHead>
          <TableHead>Роль</TableHead>
          <TableHead className="w-[50px]" />
          <TableHead className="w-[50px]" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((u) => (
          <TableRow key={u.id}>
            <TableCell>
              <Avatar>
                <AvatarImage src={u.image ?? ""} alt={u.name ?? ""} />
                <AvatarFallback>{getProfileLetters(u)}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{u.name}</TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell>{u.phone}</TableCell>
            <TableCell>{u.role}</TableCell>
            <TableCell>
              <Button variant="secondary" size="icon">
                <Link href={`${ROUTES.profile.path}/${u.id}`}>
                  <Pen />
                </Link>
              </Button>
            </TableCell>
            <TableCell>
              <Button
                variant="destructive"
                size="icon"
                disabled={isRemoving || u.role === "ADMIN"}
                onClick={() => onRemove(u.id, u.name!)}
              >
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

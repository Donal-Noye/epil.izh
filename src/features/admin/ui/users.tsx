"use client";

import { Card, CardHeader, CardTitle } from "@/shared/ui/card";
import { getAllUsersQuery } from "@/entities/user/profile";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Separator } from "@/shared/ui/separator";
import { Input } from "@/shared/ui/input";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/shared/config/public";
import { useRemoveUserMutation } from "@/features/admin/vm/use-remove-user";
import { UserId } from "@/kernel/domain/user";
import { toast } from "sonner";
import { useFilteredUsers } from "../vm/use-filtered-users";
import { UsersPreview } from "@/features/admin/ui/users-preview";
import { UsersTable } from "@/features/admin/ui/users-table";

export function Users() {
  const { data, isLoading } = useQuery(getAllUsersQuery());
  const allUsers = useMemo(
    () =>
      data?.users.map((u) => ({
        ...u,
        emailVerified: u.emailVerified ? new Date(u.emailVerified) : undefined,
      })),
    [data?.users],
  );

  const [search, setSearch] = useState("");
  const filtered = useFilteredUsers(allUsers, search);

  const { remove, isPending: isRemoving } = useRemoveUserMutation();

  const handleRemove = (id: UserId, name: string) => {
    remove(id, {
      onSuccess: () => toast.success(`Пользователь "${name}" удалён`),
      onError: (err) => toast.error(`Ошибка: ${err.message ?? err}`),
    });
  };

  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <Card className="relative ring ring-muted overflow-hidden pb-0">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Все пользователи</CardTitle>
        <Button size="sm" variant="secondary">
          <Link href={ROUTES.createUser.path}>Создать</Link>
        </Button>
      </CardHeader>

      <Separator />

      <UsersPreview
        users={filtered}
        isLoading={isLoading}
        onShowAll={() => setDialogOpen(true)}
      />

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <div />
        </DialogTrigger>

        <DialogContent className="sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Все пользователи</DialogTitle>
            <Input
              placeholder="Поиск..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-2"
            />
          </DialogHeader>

          <UsersTable
            users={filtered}
            isRemoving={isRemoving}
            onRemove={handleRemove}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}

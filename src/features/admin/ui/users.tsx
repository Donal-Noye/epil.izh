"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
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
import { Spinner } from "@/shared/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { getProfileLetters } from "@/entities/user/profile";
import { Separator } from "@/shared/ui/separator";
import { Pen, Trash } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

export function Users() {
  const usersQuery = useQuery({
    ...getAllUsersQuery(),
  });

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  const filteredUsers = useMemo(() => {
    if (!usersQuery.data?.users) return [];
    return usersQuery.data.users.filter((user) => {
      const searchLower = debouncedSearch.toLowerCase();
      return (
        user.name?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower) ||
        user.phone?.toLowerCase().includes(searchLower)
      );
    });
  }, [debouncedSearch, usersQuery.data?.users]);

  return (
    <Card className="relative pb-0 border-none ring ring-muted overflow-hidden gap-4">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <CardTitle>Все пользователи</CardTitle>
          <Button variant="secondary" size="sm">
            Создать
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="relative h-40 overflow-hidden">
        <div className="flex flex-col space-y-2">
          {usersQuery.isPending ? (
            <Spinner className="self-center text-2xl mt-10" />
          ) : (
            filteredUsers
              .slice(0, 5)
              .map((user) => <div key={user.id}>{user.name}</div>)
          )}
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent" />

        <Dialog>
          <DialogTrigger asChild>
            <div className="absolute bottom-3 left-0 w-full flex justify-center">
              <Button size="sm" variant="secondary" className="z-10 shadow">
                Показать всех
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md lg:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Все пользователи</DialogTitle>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mt-2"
                placeholder="Поиск..."
              />
            </DialogHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Имя</TableHead>
                  <TableHead>Почта</TableHead>
                  <TableHead>Номер телефона</TableHead>
                  <TableHead>Роль</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={user.image ?? ""} alt="" />
                        <AvatarFallback>
                          {getProfileLetters(user)}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Button variant="secondary" size="icon">
                        <Pen />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="destructive" size="icon">
                        <Trash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

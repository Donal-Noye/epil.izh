"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { LogOut, Notebook, User } from "lucide-react";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { useSignOut } from "@/features/auth/use-sign-out";
import { SignInButton } from "@/features/auth/sign-in-button";
import { useAppSession } from "@/kernel/lib/next-auth/client";
import { Spinner } from "@/shared/ui/spinner";
import { ProfileAvatar } from "@/services/user/ui/profile-avatar";

export function Profile() {
  const session = useAppSession();
  const { signOut, isPending: isLoadingSignOut } = useSignOut();

  if (session.status === "loading") {
    return (
      <Button variant="secondary" className="text-base" size="lg">
        <Spinner className="text-neutral-400" />
      </Button>
    );
  }

  if (session.status === "unauthenticated") {
    return <SignInButton />;
  }

  const user = session?.data?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-sm sm:text-base" variant="secondary" size="lg">
          <ProfileAvatar
            classNameFallback="bg-neutral-200 text-sm"
            profile={user}
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
          {user ? user.name : undefined}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2 ">
        <DropdownMenuLabel>
          <p>Мой аккаунт</p>
          <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">
            {user?.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuGroup></DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/profile/1`}>
              <User className="mr-2 h-4 w-4" />
              <span>Профиль</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/records`}>
              <Notebook className="mr-2 h-4 w-4" />
              <span>Мои записи</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isLoadingSignOut}
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Выход</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

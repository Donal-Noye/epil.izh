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
import { LogOut, User } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useSignOut } from "@/features/auth/use-sign-out";
import { SignInButton } from "@/features/auth/sign-in-button";
import { useAppSession } from "@/kernel/lib/next-auth/client";
import { Spinner } from "@/shared/ui/spinner";
import { ProfileAvatar } from "@/entities/user/ui/profile-avatar";
import { cn } from "@/shared/ui/utils";
import Link from "next/link";
import { ROUTES } from "@/shared/config/public";

type ProfileProps = {
  className?: string;
  avatarClassName?: string;
  triggerSize?: "sm" | "lg" | "icon" | "default";
  triggerVariant?: "default" | "secondary" | "outline" | "ghost";
  showEmail?: boolean;
  children?: React.ReactNode;
  onClick?: () => void
};

export function ProfileMenu({
  className,
  avatarClassName,
  triggerSize = "lg",
  triggerVariant = "secondary",
  showEmail = true,
  children,
  onClick
}: ProfileProps) {
  const session = useAppSession();
  const { signOut, isPending: isLoadingSignOut } = useSignOut();

  if (session.status === "loading") {
    return (
      <Button variant={triggerVariant} className={className} size={triggerSize}>
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
        <Button
          className={cn(
            "text-sm sm:text-base",
            "group-data-[collapsible=icon]:px-3",
            "group-data-[collapsible=icon]:justify-center",
            className,
          )}
          variant={triggerVariant}
          size={triggerSize}
        >
          <ProfileAvatar
            profile={user}
            className={cn("w-6 h-6 sm:w-8 sm:h-8", avatarClassName)}
            classNameFallback="bg-neutral-200 text-sm"
          />
          <p className="group-data-[collapsible=icon]:hidden">{user?.name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2">
        <DropdownMenuLabel>
          <p>Мой аккаунт</p>
          {showEmail && (
            <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">
              {user?.email}
            </p>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link onClick={onClick} href={`${ROUTES.profile.path}/${user?.id}`}>
              <User className="mr-2 h-4 w-4" />
              <span>Профиль</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {children && (
          <>
            <DropdownMenuGroup>{children}</DropdownMenuGroup>
          </>
        )}

        <DropdownMenuGroup>
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

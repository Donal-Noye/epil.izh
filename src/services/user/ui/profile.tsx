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
import Link from "next/link";
import { useSignOut } from "@/features/auth/use-sign-out";
import { Skeleton } from "@/shared/ui/skeleton";
import { SignInButton } from "@/features/auth/sign-in-button";
import {Avatar, AvatarFallback, AvatarImage} from "@/shared/ui/avatar";
import {useAppSession} from "@/services/user/use-app-session";

export function Profile() {
	const session = useAppSession();
	const { signOut, isPending: isLoadingSignOut } = useSignOut();

	if (session.status === "loading") {
		return (
			<Button
				variant="secondary"
				className="text-base"
				size="lg"
				asChild
			>
				<Skeleton />
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
					variant="secondary"
					size="lg"
				>
					<Avatar className="w-8 h-8">
						<AvatarImage src={user?.image} />
						<AvatarFallback>AC</AvatarFallback>
					</Avatar>
					{user?.name}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 mr-2 ">
				<DropdownMenuLabel>
					<p>Мой аккаунт</p>
					<p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">
						{user?.name}
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
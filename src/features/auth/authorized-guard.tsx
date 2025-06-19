"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { useAppSession } from "@/kernel/lib/next-auth/client";
import { FullPageLogoSpinner } from "@/shared/ui/full-page-logo-spinner";

export default function AuthorizedGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useAppSession();

  const isUnauthenticated = session.status === "unauthenticated";

  useEffect(() => {
    if (isUnauthenticated) {
      signIn();
    }
  }, [isUnauthenticated]);

  const isLoading = session.status === "loading" ||
    session.status === "unauthenticated"

  return (
    <>
      <FullPageLogoSpinner isLoading={isLoading} />
      {session.status === "authenticated" && children}
    </>
  );
}

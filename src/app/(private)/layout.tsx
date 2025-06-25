"use client";

import AuthorizedGuard from "@/features/auth/authorized-guard";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/ui/sidebar";
import { AppSidebar } from "@/app/widgets/app-sidebar";
import { Separator } from "@/shared/ui/separator";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/shared/config/public";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  function getPageTitle(pathname: string): string {
    const route = Object.values(ROUTES)
      .filter((r) => pathname.startsWith(r.path))
      .sort((a, b) => b.path.length - a.path.length)[0];
    return route?.label ?? "";
  }

  const pageTitle = getPageTitle(pathname);

  return (
    <>
      <AuthorizedGuard>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <h1 className="text-lg font-semibold">{pageTitle}</h1>
            </header>
            <main className="flex flex-1 flex-col p-4 container">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </AuthorizedGuard>
    </>
  );
}

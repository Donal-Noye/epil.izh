import AuthorizedGuard from "@/features/auth/authorized-guard";
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";
import { AppSidebar } from "@/app/widgets/app-sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthorizedGuard>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex flex-1 flex-col">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </AuthorizedGuard>
    </>
  );
}

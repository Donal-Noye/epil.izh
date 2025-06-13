"use client";

import { ComposeChildren } from "@/shared/lib/react";
import { AppSessionProvider } from "@/kernel/lib/next-auth/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/query-client";
import { ThemeProvider } from "@/features/theme/theme-provider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      <AppSessionProvider />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      />
      <QueryClientProvider client={queryClient} />
      {children}
    </ComposeChildren>
  );
}

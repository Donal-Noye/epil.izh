"use server"

import { getProviders } from "next-auth/react";
import { cn } from "@/shared/ui/utils";
import { EmailSignInForm } from "./ui/email-sign-in-form";
import { Divider } from "./ui/divider";
import { ProviderButton } from "./ui/provider-button";

export async function SignInForm({ className }: { className?: string }) {
  const providers = await getProviders();
  const oauthProviders = Object.values(providers ?? {}).filter(
    (provider) => provider.type === "oauth",
  );

  return (
    <div className={cn("grid gap-6", className)}>
      <EmailSignInForm />
      <Divider />
      {oauthProviders.map((provider) => (
        <ProviderButton key={provider.id} provider={provider} />
      ))}
    </div>
  );
}
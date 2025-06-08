"use client";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";
import { Github } from "lucide-react";
import { ClientSafeProvider } from "next-auth/react";
import { useOAuthSignIn } from "@/features/auth/vm/use-oauth-sign-in";

export function ProviderButton({ provider }: { provider: ClientSafeProvider }) {
  const oauthSignIn = useOAuthSignIn(provider);

  const getIcon = (provider: ClientSafeProvider) => {
    switch (provider.id) {
      case "github":
        return <Github className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Button
      className="flex-1"
      variant="outline"
      type="button"
      disabled={oauthSignIn.isPending}
      onClick={() => oauthSignIn.signIn()}
    >
      {oauthSignIn.isPending ? (
        <Spinner className="h-4 w-4" aria-label="Вход" />
      ) : (
        getIcon(provider)
      )}
      {provider.name}
      <span className="sr-only">Login with {provider.name}</span>
    </Button>
  );
}
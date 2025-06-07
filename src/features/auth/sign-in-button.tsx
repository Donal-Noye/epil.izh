import { signIn } from "next-auth/react";
import { Button } from "@/shared/ui/button";

export function SignInButton() {
  const handleSignIn = () => signIn();

  return (
    <Button
      onClick={handleSignIn}
      variant="secondary"
      className="text-sm sm:text-base"
      size="lg"
    >
      Войти
    </Button>
  );
}

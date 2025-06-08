import { Card, CardContent } from "@/shared/ui/card";
import Image from "next/image";
import { SignInForm } from "@/features/auth/sing-in-form.server";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";

export default function AuthenticationPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Button variant="link" asChild>
          <Link className="text-sm text-neutral-500" href="/">
            <ArrowLeft />
            Вернуться
          </Link>
        </Button>
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2 items-stretch">
              <div className="flex flex-col gap-6 p-6 md:p-8">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold mb-1">С возвращением!</h1>
                  <p className="text-muted-foreground text-balance text-sm">
                    Войдите в свою учетную запись Epil.izh
                  </p>
                </div>
                <Suspense>
                  <SignInForm />
                </Suspense>
              </div>
              <div className="bg-muted relative hidden md:block">
                <Image
                  fill
                  src="/images/auth.jpg"
                  alt="Лазерная Эпиляция"
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

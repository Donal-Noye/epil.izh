"use client";

import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { useEmailSignIn } from "@/features/auth/vm/use-email-sign-in";
import { Spinner } from "@/shared/ui/spinner";

export function EmailSignInForm() {
  const form = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
  });

  const emailSignIn = useEmailSignIn();

  return (
    <Form {...form}>
      <form
        className=""
        onSubmit={form.handleSubmit((data) => emailSignIn.signIn(data.email))}
      >
        <div className="flex flex-col gap-4">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={emailSignIn.isPending}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={emailSignIn.isPending}
            type="submit"
            className="w-full"
          >
            {emailSignIn.isPending && (
              <Spinner className="h-4 w-4" aria-label="Загрузка" />
            )}
            Войти
          </Button>
        </div>
      </form>
    </Form>
  );
}

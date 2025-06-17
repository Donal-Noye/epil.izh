import { Separator } from "@/shared/ui/separator";
import { UpdateProfileForm } from "@/features/update-profile/update-profile-form";
import { getAppSessionServer } from "@/kernel/lib/next-auth/server";
import { redirect } from "next/navigation";

export default async function NewUserPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  const session = await getAppSessionServer();

  if (!session) {
    return redirect("/auth/sign-in");
  }

  return (
    <main className="space-y-6 py-14 container max-w-2xl">
      <div>
        <h3 className="text-lg font-medium">Последний шаг</h3>
        <p className="text-sm text-muted-foreground">
          Ведь даже лазер любит знать, для кого он работает!
        </p>
      </div>
      <Separator />
      <UpdateProfileForm
        userId={session.user.id}
        callbackUrl={searchParams.callbackUrl}
      />
    </main>
  );
}

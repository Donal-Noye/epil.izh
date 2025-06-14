import { Separator } from "@/shared/ui/separator";
import { UpdateProfileForm } from "@/features/update-profile/update-profile-form";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-6 py-14 container max-w-2xl">
      <div>
        <h3 className="text-lg font-medium">Профиль</h3>
      </div>
      <Separator />
      <UpdateProfileForm userId={id} />
    </div>
  );
}

import { Button } from "@/shared/ui/button";
import { ProfileAvatar } from "@/entities/user/ui/profile-avatar";
import { useUploadAvatar } from "@/entities/user/profile";
import { Spinner } from "@/shared/ui/spinner";
import { Profile } from "@/entities/user/profile";

export function AvatarField({
  value,
  onChange,
  profile,
}: {
  value?: string;
  onChange: (value?: string) => void;
  profile?: Profile;
}) {
  const { handleSelectFile, isPending } = useUploadAvatar({
    onSuccess: onChange,
  });

  return (
    <Button
      variant="ghost"
      className="w-[84px] h-[84px] p-0.5 rounded-full relative block"
      disabled={isPending}
      onClick={handleSelectFile}
      type="button"
    >
      {isPending && (
        <div className="inset-0 absolute flex items-center justify-center z-10">
          <Spinner className="w-10 h-10" aria-label="Загрузка новой аватарки" />
        </div>
      )}
      <ProfileAvatar
        className="w-full h-full"
        profile={{
	        email: profile?.email ?? "",
	        image: value ?? ""
        }}
      />
    </Button>
  );
}

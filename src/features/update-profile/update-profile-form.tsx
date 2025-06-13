"use client";
import { useQuery } from "@tanstack/react-query";
import { ProfileForm } from "./ui/profile-form";
import { Spinner } from "@/shared/ui/spinner";
// import { getProfileQuery } from "@/services/profile/queries";
import { useRouter } from "next/navigation";

export function UpdateProfileForm({
  userId,
  callbackUrl,
}: {
  userId: string;
  callbackUrl?: string;
}) {
  const router = useRouter();
  // const { data: profile, isPending } = useQuery({
  //   ...getProfileQuery(userId),
  // });
  //
  // const handleSuccess = () => {
  //   if (callbackUrl) {
  //     router.push(callbackUrl);
  //   }
  // };
  //
  // if (isPending) {
  //   return <Spinner aria-label="Загрузка профиля" />;
  // }
  //
  // if (!profile) {
  //   return <div>Не удалось загрузить профиль, возможно у вас нет прав</div>;
  // }

  return (
    <ProfileForm
      // profile={profile}
      onSuccess={() => {}}
      submitText={callbackUrl ? "Продолжить" : "Сохранить"}
    />
  );
}

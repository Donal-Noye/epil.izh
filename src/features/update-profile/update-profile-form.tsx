"use client";
import { useQuery } from "@tanstack/react-query";
import { ProfileForm } from "./ui/profile-form";
import { Spinner } from "@/shared/ui/spinner";
import { getProfileQuery } from "@/services/user/profile";

export function UpdateProfileForm({
  userId,
  callbackUrl,
}: {
  userId: string;
  callbackUrl?: string;
}) {
  const profileQuery = useQuery({
    ...getProfileQuery(userId),
  });

  if (profileQuery.isPending) {
    return <Spinner aria-label="Загрузка профиля" />;
  }

  if (!profileQuery.data) {
    return <div>Не удалось загрузить профиль, возможно у вас нет прав</div>;
  }

  return (
    <ProfileForm
      profile={profileQuery.data.profile}
      // onSuccess={() => {}}
      submitText={callbackUrl ? "Продолжить" : "Сохранить"}
    />
  );
}

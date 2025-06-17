"use client";

import { useQuery } from "@tanstack/react-query";
import { ProfileForm } from "./ui/profile-form";
import { Spinner } from "@/shared/ui/spinner";
import { getProfileQuery } from "@/services/user/profile";
import { useRouter } from "next/navigation";

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

  const router = useRouter();
  const handleSuccess = () => {
    if (callbackUrl) {
      router.push(callbackUrl);
    } else if (callbackUrl === "/") {
      router.push("/records");
    }
  };

  if (profileQuery.isPending) {
    return <Spinner aria-label="Загрузка профиля" />;
  }

  if (!profileQuery.data) {
    return <div>Не удалось загрузить профиль, возможно у вас нет прав</div>;
  }

  return (
    <ProfileForm
      userId={userId}
      profile={profileQuery.data.profile}
      onSuccess={handleSuccess}
      submitText={callbackUrl ? "Продолжить" : "Сохранить"}
    />
  );
}

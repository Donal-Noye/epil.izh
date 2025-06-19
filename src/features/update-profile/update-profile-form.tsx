"use client";

import { useQuery } from "@tanstack/react-query";
import { ProfileForm } from "./ui/profile-form";
import { getProfileQuery } from "@/entities/user/profile";
import { useRouter } from "next/navigation";
import { ProfileFormSkeleton } from "@/features/update-profile/ui/profile-form-skeleton";

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
    return <ProfileFormSkeleton />;
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

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Profile } from "../domain/types";
import { cn } from "@/shared/ui/utils";
import { getProfileLetters } from "../vm/get-profile-letters";

export const ProfileAvatar = ({
  profile,
  className,
}: {
  profile?: Profile;
  className?: string;
}) => {
  if (!profile) {
    return null;
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={profile.image ?? ""} />
      <AvatarFallback>{getProfileLetters(profile)}</AvatarFallback>
    </Avatar>
  );
};

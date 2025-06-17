import { useMutation } from "@tanstack/react-query";
import { selectFile, validateFileSize } from "@/shared/lib/file";
import {
  AVATAR_FILE_KEY,
  AVATAR_MAX_SIZE,
} from "@/features/update-profile/constants";
import { uploadAvatarAction } from "@/features/update-profile/actions/upload-avatar";

export const useUploadAvatar = ({
  onError,
  onSuccess
}: {
  onError?: (type?: "big-size") => void;
  onSuccess?: (avatarPath: string) => void;
}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadAvatarAction,
    onSuccess(data) {
      onSuccess?.(data.avatar.path);
    }
  });

  const handleSelectFile = async () => {
    const file = await selectFile("image/*");
    if (!validateFileSize(file, AVATAR_MAX_SIZE)) {
      return onError?.("big-size");
    }

    const formData = new FormData();

    formData.set(AVATAR_FILE_KEY, file);

    await mutateAsync(formData);
  };

  return {
    handleSelectFile,
    isPending,
  };
};

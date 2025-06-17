"use server"

import { z } from "zod";
import { AVATAR_FILE_KEY } from "@/features/update-profile/constants";
import { BadRequest } from "@/shared/lib/errors";
import { fileStorage } from "@/shared/lib/file-storage";

const resultSchema = z.object({
  avatar: z.object({
    path: z.string(),
  }),
});

export const uploadAvatarAction = async (formData: FormData) => {
  const file = formData.get(AVATAR_FILE_KEY) as unknown as File

  if (!file || !(file instanceof Blob)) {
    throw new BadRequest()
  }

  const storedFile = await fileStorage.uploadImage(file, AVATAR_FILE_KEY)

  return resultSchema.parse({
    avatar: storedFile,
  })
};

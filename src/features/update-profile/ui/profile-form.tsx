"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Spinner } from "@/shared/ui/spinner";
import { AvatarField } from "@/entities/user/profile";
import { cn } from "@/shared/ui/utils";
import { Profile } from "@/entities/user/profile";
import { useUpdateProfile } from "../vm/use-update-profile";
import { UserId } from "@/kernel/domain/user";

const profileFormSchema = z.object({
  name: z
    .string()
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim())
    .optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  image: z.string().optional(),
});

const getDefaultValues = (profile: Profile) => {
  return {
    name: profile.name ?? "",
    email: profile.email,
    image: profile.image ?? undefined,
    phone: profile.phone ?? ""
  };
};

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm({
  userId,
  profile,
  onSuccess,
  submitText = "Сохранить",
  className
}: {
  userId: UserId
  profile: Profile;
  onSuccess?: () => void;
  submitText?: string;
  className?: string;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: getDefaultValues(profile)
  });

  const updateProfile = useUpdateProfile()

  const handleSubmit = form.handleSubmit(async data => {
    const newProfile = await updateProfile.update({
      userId,
      data,
    })

    form.reset(getDefaultValues(newProfile.profile))
    onSuccess?.()
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className={cn("space-y-8", className)}>
        <FormField
          control={form.control}
          name="email"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер телефона</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Аватар</FormLabel>
              <FormControl>
                <AvatarField
                  value={field.value}
                  onChange={field.onChange}
                  profile={profile}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={false}>
          {updateProfile.isPending && (
            <Spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-label="Обновление профиля"
            />
          )}
          {submitText}
        </Button>
      </form>
    </Form>
  );
}

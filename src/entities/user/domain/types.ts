export type Profile = {
  email: string;
  name?: string | null;
  image?: string | null;
  phone?: string | null;
}

export type CreateUser = {
  email: string;
  name?: string | null;
  image?: string | null;
  phone?: string | null;
  emailVerified?: Date | null;
};
"use server";

import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/entities/user/next-auth-config";
import { NeedAuthError } from "@/shared/lib/errors";

export const getAppSessionServer = async () => await getServerSession(nextAuthConfig);

export const getAppSessionStrictServer = async () => {
  const session = await getAppSessionServer();

  if (session === null) {
    throw new NeedAuthError();
  }

  return session;
};

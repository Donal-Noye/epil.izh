"use server";

import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/services/user/next-auth-config";

export const getAppSessionServer = () => getServerSession(nextAuthConfig);

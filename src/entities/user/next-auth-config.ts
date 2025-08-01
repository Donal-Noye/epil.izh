import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { dbClient } from "@/shared/lib/db";
import { compact } from "lodash-es";
import { privateConfig } from "@/shared/config/private";
import { createUserUseCase } from "@/entities/user/use-case/create-user";
import { SharedUser } from "@/kernel/domain/user";

const prismaAdapter = PrismaAdapter(dbClient)

export const nextAuthConfig: AuthOptions = {
  adapter: {
    ...prismaAdapter,
    createUser: (user: SharedUser) => {
      return createUserUseCase.exec(user)
    }
  } as AuthOptions["adapter"],
  callbacks: {
    session: async ({session, user}) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: user.role,
          phone: user.phone
        }
      }
    },
    redirect: async () => {
      return `/records`;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/auth/new-user",
    verifyRequest: "/auth/verify-request",
  },
  providers: compact([
    EmailProvider({
      server: {
        host: privateConfig.EMAIL_SERVER_HOST,
        port: privateConfig.EMAIL_SERVER_PORT,
        auth: {
          user: privateConfig.EMAIL_SERVER_USER,
          pass: privateConfig.EMAIL_SERVER_PASSWORD,
        },
      },
      from: privateConfig.EMAIL_FROM,
    }),
    privateConfig.GITHUB_ID &&
      privateConfig.GITHUB_SECRET &&
      GithubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
      }),
  ]),
}
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import * as bcrypt from "bcrypt";
import { AuthOptions, Session, getServerSession } from "next-auth";
import { encode, decode } from "next-auth/jwt";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { loginSchema } from "@/validation/loginSchema";
import { emailProviderConfig } from "./helper";

interface Context {
  params: { nextauth: string[] };
}

export const authOptionsWrapper = (
  request: NextRequest,
  context: Context
): [NextRequest, Context, AuthOptions] => {
  const { params } = context;
  const isCredentialsCallback =
    params.nextauth.includes("callback") &&
    params.nextauth.includes("credentials") &&
    request.method === "POST";
  return [
    request,
    context,
    {
      callbacks: {
        async signIn({ user }) {
          if (isCredentialsCallback) {
            if (user) {
              const sessionToken = randomUUID();
              const sessionExpiry = new Date(
                Date.now() + 60 * 60 * 24 * 30 * 1000
              );

              await db.session.create({
                data: {
                  sessionToken,
                  userId: user.id,
                  expires: sessionExpiry,
                },
              });

              cookies().set("next-auth.session-token", sessionToken, {
                expires: sessionExpiry,
              });
            }
          }
          return true;
        },
        async redirect({ baseUrl }) {
          return baseUrl;
        },
        session({ session, user }) {
          if (user) {
            return {
              ...session,
              user: {
                ...session.user,
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: null,
              },
            };
          }
          return session;
        },
      },
      jwt: {
        maxAge: 60 * 60 * 24 * 30,
        encode: async (arg) => {
          if (isCredentialsCallback) {
            const cookie = cookies().get("next-auth.session-token");

            if (cookie) return cookie.value;
            return "";
          }

          return encode(arg);
        },
        decode: async (arg) => {
          if (isCredentialsCallback) {
            return null;
          }
          return decode(arg);
        },
      },
      secret: process.env.NEXTAUTH_SECRET,
      session: {
        strategy: "database",
      },
      pages: {
        signIn: "/auth/sign-in",
        verifyRequest: "/auth/verify-request",
      },
      //@ts-ignore
      adapter: PrismaAdapter(db),

      events: {
        async signOut({ session }) {
          const { sessionToken = "" } = session as unknown as {
            sessionToken?: string;
          };

          if (sessionToken) {
            await db.session.deleteMany({
              where: {
                sessionToken,
              },
            });
          }
        },
      },
      providers: [
        EmailProvider(emailProviderConfig),
        CredentialsProvider({
          credentials: {
            email: { label: "email", type: "text" },
            password: { label: "Password", type: "password" },
          },
          authorize: async (credentials) => {
            console.log("Running authorize");
            try {
              const result = await loginSchema.safeParseAsync(credentials);

              if (!result.success) {
                throw new Error(result.error.errors[0].message);
              }

              const { email, password } = result.data;

              const user = await db.user.findUnique({
                where: {
                  email,
                },
                include: {
                  accounts: true,
                },
              });

              if (!user) {
                throw new Error("User account does not exist");
              }

              if (user.accounts[0].provider !== "credentials") {
                throw new Error(
                  `Please sign in with ${user.accounts[0].provider}`
                );
              }

              const passwordsMatch = await bcrypt.compare(
                password,
                user?.password!
              );

              if (!passwordsMatch) {
                throw new Error("Password is not correct");
              }

              console.log("User Found");

              return user as any;
            } catch (error) {
              if (
                error instanceof Prisma.PrismaClientInitializationError ||
                error instanceof Prisma.PrismaClientKnownRequestError
              ) {
                throw new Error(
                  "System error. Please contact support if this issue persists"
                );
              }

              throw error;
            }
          },
        }),
      ],
    },
  ];
  // Configure one or more authentication providers
};

export async function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  const session = await getServerSession(
    ...args,
    authOptionsWrapper(args[0] as any, {
      params: { nextauth: ["session"] },
    })[2]
  );
  if (session) return session.user;
}

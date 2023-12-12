import NextAuth, { AuthOptions } from "next-auth";
import EmailProvider, {
  EmailUserConfig,
  SendVerificationRequestParams,
} from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { db } from "@/lib/db";
import * as bcrypt from "bcrypt";
import { getNodeEnv } from "@/utils/getNodeEnv";

const prisma = new PrismaClient();

type EmailProviderProps = EmailUserConfig;

const sendVerificationRequest = (params: SendVerificationRequestParams) => {
  console.log(params.url);
};

const emailProviderConfig: EmailProviderProps = {
  server: {
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_USERNAME,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  },
  from: "no-reply@amortize.ai",
};

if (getNodeEnv() === "development") {
  emailProviderConfig.sendVerificationRequest = sendVerificationRequest;
}

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  callbacks: {
    async signIn({ user, account, email }) {
      if (!user) return false;
      if (!user.email) return false;
      const dbUser = await db.user.findUnique({
        where: {
          email: user.email,
        },
      });
      if (dbUser) return true;
      if (!dbUser) return "/auth/sign-in?unauthorized=true";
      return "/auth/sign-in";
    },
    session({ session, token, user }) {
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
            emailVerified: user.emailVerified,
            image: user.image,
            password: null,
          },
        };
      }
      return session;
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
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  providers: [
    // ...add more providers here
    EmailProvider(emailProviderConfig),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        // const res = await fetch("/your/endpoint", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = await res.json();

        const user = await db.user.findUnique({
          where: {
            email: credentials?.username,
            password: credentials?.password,
          },
        });

        if (
          credentials &&
          credentials.password &&
          credentials.username &&
          user &&
          user.password
        ) {
          const match = await bcrypt.compare(
            credentials?.password,
            user.password
          );
          if (match) {
            return user;
          }
        }

        return null;

        // If no error and we have user data, return it

        // if (res.ok && user) {
        //   return user;
        // }
        // Return null if user data could not be retrieved
        //return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

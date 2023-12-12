import { User as PrismaUser } from "@prisma/client";
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Session extends DefaultSession["user"] {
    user: PrismaUser;
  }

  export interface User extends DefaultUser {
    id: string;
    firstName: string;
    lastName: string;
  }

  declare module "next-auth/adapters" {
    interface AdapterUser {
      id: string;
      firstName: string;
      lastName: string;
    }
  }
}

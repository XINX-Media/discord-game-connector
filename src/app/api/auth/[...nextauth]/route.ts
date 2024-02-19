import NextAuth from "next-auth";
import { NextRequest } from "next/server";
import { authOptionsWrapper } from "./auth";

interface Context {
  params: { nextauth: string[] };
}

const handler = async (request: NextRequest, context: Context) => {
  return NextAuth(...authOptionsWrapper(request, context));
};

export { handler as GET, handler as POST };

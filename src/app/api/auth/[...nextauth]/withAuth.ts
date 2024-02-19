import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import { Session, User } from "next-auth";

export const withAuth = (
  fn: ({
    ...args
  }: {
    req: NextRequest;
    user: Session["user"];
    params: Record<"slug", string>;
  }) => Promise<NextResponse>
) => {
  return async (
    request: NextRequest,
    pars: { params: Record<"slug", string> }
  ) => {
    const req = request;
    const { params } = pars;
    const user = await auth();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthenticated." },
        { status: 401 }
      );
    }
    return await fn({ req, user: user, params });
  };
};

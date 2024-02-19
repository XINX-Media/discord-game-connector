import { registerSchema } from "@/validation/registerSchema";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const result = await registerSchema.safeParseAsync(data);

    if (!result.success) {
      return NextResponse.json({
        error: result.error.errors[0].message,
      });
    }

    const { email, password, firstName, lastName, confirmPassword } =
      result.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return NextResponse.json({
        error: "User already exist with this email",
      });
    }

    const newUser = await db.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      throw new Error("");
    }

    await db.account.create({
      data: {
        userId: newUser.id,
        type: "credentials",
        provider: "credentials",
        providerAccountId: newUser.id,
      },
    });

    return NextResponse.json({
      message: "User created successfully.",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    console.log(error);
    return NextResponse.json({
      error: "System error. Please contact support if this issue persists",
    });
  }
}

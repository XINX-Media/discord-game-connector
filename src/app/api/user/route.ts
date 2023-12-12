import { db } from "@/lib/db";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await db.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return NextResponse.json({ success: false }, { status: 500 });
  }
};

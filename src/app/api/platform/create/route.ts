import { db } from "@/lib/db";
import { PrismaClient } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const platform = await prisma.platform.create({          
            data: {
                external_id: data.external_id,
            },
        });

        return NextResponse.json({ success: true, platform });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return NextResponse.json({ success: false }, { status: 500 });
        }
    }
};
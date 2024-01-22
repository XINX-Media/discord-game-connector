import { db } from "@/lib/db";
import { PrismaClient } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, message: "No id given "}, { status: 400 });
        }
        
        const platform = await db.platform.findUnique({
            where: {
                id: id,
            }
        })

        if (platform) {
            return NextResponse.json({ success: true, platform });
        }
        if (!platform) {
            return NextResponse.json({ success: false, message: "Platform not found"}, { status: 404});
        }

        return NextResponse.json({ success: true, platform });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return NextResponse.json({ success: false }, { status: 500 });
        }
    }
}
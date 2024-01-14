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

export async function GET(req: Request, res: Response) {
    // try {
    //     const platform = await prisma.platform.findMany();

    //     return NextResponse.json({ success: true, platform });
    // } catch (error) {
    //     if (error instanceof Error) {
    //         console.log(error.message);
    //         return NextResponse.json({ success: false }, { status: 500 });
    //     }
    // }

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, message: "No id given "}, { status: 400 });
        }

        const platform = await prisma.platform.findUnique({
            where: {
                id: id
            }
        })
        
        if (!platform) {
            return NextResponse.json({ success: false, message: "Platform not found"}, { status: 404});
        }

        return NextResponse.json({ success: true, platform });
    } catch (error) {
        console.log(error);
    }
}
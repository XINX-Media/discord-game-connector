import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";


const prisma = new PrismaClient();

export async function GET() {
    try {
        const gameTable = await prisma.gameTable.findMany();

        return NextResponse.json({ success: true, gameTable });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return NextResponse.json({ success: false }, { status: 500 });
        }
    }

}

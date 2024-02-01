import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        
        if (!id) {
            return NextResponse.json({ success: false, message: "No id given "}, { status: 400 });
        }

        const gameTable = await prisma.gameTable.findUnique({
            where: {
                id: id,
            }
        });

        if (!gameTable) {
            return NextResponse.json({ success: false, message: "GameTable not found"}, { status: 404});
        }

        return NextResponse.json({ success: true, gameTable });

    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return NextResponse.json({ success: false }, { status: 500 });
        }
    }
}
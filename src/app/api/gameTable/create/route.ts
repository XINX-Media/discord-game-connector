import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const gameTable = await prisma.gameTable.create({   
            //No data here yet until we have a better idea of what will go in here       
            data: {
                tempValue: data.tempValue,
            },
        });

        return NextResponse.json({ success: true, gameTable });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return NextResponse.json({ success: false }, { status: 500 });
        }
    }
};
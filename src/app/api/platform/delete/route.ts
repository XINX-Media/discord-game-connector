import { PrismaClient } from "@prisma/client";
import { url } from "inspector";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function DELETE(req: Request, res: Response) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        
        if (!id) {
            return NextResponse.json({ success: false, message: "No id given "}, { status: 400 });
        }

        const platform = await prisma.platform.delete({
            where: {
                id: id,
            }
        });

        if (!platform) {
            return NextResponse.json({ success: false, message: "Platform not found"}, { status: 404});
        }

        return NextResponse.json({ success: true, message: `Object with id = ${id} was deleted.` });

    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return NextResponse.json({ success: false }, { status: 500 });
        }
    }
}
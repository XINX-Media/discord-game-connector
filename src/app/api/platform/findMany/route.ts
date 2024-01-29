import { db } from "@/lib/db";
import { PrismaClient } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { NextResponse, NextRequest } from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next'


const prisma = new PrismaClient();

// This works

export async function GET() {
    try {
        const platform = await prisma.platform.findMany();

        return NextResponse.json({ success: true, platform });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return NextResponse.json({ success: false }, { status: 500 });
        }
    }

}


// Testing alternative routes

// export async function GET(res: Response){
//     try {
        
//         // const platform = await prisma.platform.findMany();
//         const foo = await fetch('http://localhost:3306/dgc/platform', {
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         })
//         const product = await foo.json();
//         return Response.json({ product });
        
        
//     } catch (error) {
//         if (error instanceof Error) {
//             console.log(error.message);
//             return Response.json({ success: false }, { status: 500 });
//         }
//     }

// }




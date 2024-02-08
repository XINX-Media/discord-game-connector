import { db } from "@/lib/db";
import { PrismaClient, Prisma } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { NextResponse, NextRequest } from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next'

export const runtime = 'edge'

const prisma = new PrismaClient();

// This works when using Postman and running the server, but doesn't pass the test.

export async function GET() {
    try {
        const platform = await prisma.platform.findMany();

        return NextResponse.json({ success: true, platform }, { status: 200});
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return NextResponse.json({ success: false }, { status: 500 });
        }
    }

}

// export async function GET() {
//     try {
//         const platform = await prisma.platform.findMany();
//         return new NextResponse(JSON.stringify({success: true, platform}), {
//             status: 200,
//             headers: {'Content-Type': 'application/json',
//             },
//         });
//     } catch (error) {
//         if (error instanceof Error) {
//             console.log(error.message);
//             return Response.json({ success: false}, { status: 500 });
//         }
//     }
// }


// This will pass the test but doesn't work when using Postman and running the server

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         const platform = await prisma.platform.findMany();
//         res.json({ success: true, platform });
//     } catch (error) {
//         if (error instanceof Prisma.PrismaClientKnownRequestError) {
//             // Handle known request errors (e.g., unique constraint violation)
//             console.log('Request error:', error.message);
//             return NextResponse.json({ success: false, message: error.message }, { status: 400 });
//         } else if (error instanceof Prisma.PrismaClientInitializationError) {
//             // Handle initialization errors
//             console.log('Initialization error:', error.message);
//             return NextResponse.json({ success: false, message: 'Database initialization error' }, { status: 500 });
//         } else if (error instanceof Prisma.PrismaClientRustPanicError) {
//             // Handle internal Prisma errors
//             console.log('Internal error:', error.message);
//             return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
//         } else if (error instanceof Prisma.PrismaClientValidationError) {
//             // Handle validation errors
//             console.log('Validation error:', error.message);
//             return NextResponse.json({ success: false, message: 'Bad request' }, { status: 400 });
//         } else if (error instanceof Error) {
//             // Handle other types of errors
//             console.log('Unexpected error:', error.message);
//             return NextResponse.json({ success: false, message: 'Unexpected error' }, { status: 500 });
//         }
//     }
// }






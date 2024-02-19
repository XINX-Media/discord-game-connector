import { isNodeEnv } from "@/utils/enviornmentHelpers";
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({ log: ["info"] });
if (!isNodeEnv("production")) global.prisma = prisma;

export const db = prisma;

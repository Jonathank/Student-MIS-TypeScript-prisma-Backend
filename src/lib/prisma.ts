// import { PrismaClient } from "@prisma/client";


// const PrismaClientSingleton = () => {
//     return new PrismaClient();
// }

// declare const globalThis: {
//     prismaGlobal: ReturnType<typeof PrismaClientSingleton>;
// } & typeof global;

// const prisma = globalThis.prismaGlobal ?? PrismaClientSingleton()

// export default prisma
// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

// src/prisma/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;

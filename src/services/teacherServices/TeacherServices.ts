import prisma from "../../lib/prisma";

export class TeachersService {

    async getAllTeachers(page: number, limit: number) {
        try {
            const skip = (page - 1) * limit;

            const [teachers, total] = await Promise.all([
                prisma.teacher.findMany({
                    include: {
                        subjects: true,
                        classes: true,
                    },
                    take: limit,
                    skip: skip, 
                }),
                prisma.teacher.count()
            ]);

            return {
                data:teachers,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        } catch (error: unknown) {
            console.error("Error retrieving teachers:", error);
            throw new Error("Failed to fetch teachers");
        }
    }  
}

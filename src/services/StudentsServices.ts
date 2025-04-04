import prisma from "../lib/prisma";

export class StudentsService {

    async getAllStudents(page: number = 1, limit: number = 10) {
        try {
            const skip = (page - 1) * limit;

            const [students, total] = await Promise.all([
                prisma.student.findMany({
                    include: {
                        grade: true,
                        class: true,
                    },
                    take: limit,
                    skip: skip, 
                }),
                prisma.teacher.count()
            ]);

            return {
                data:students,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        } catch (error: unknown) {
            console.error("Error retrieving students:", error);
            throw new Error("Failed to fetch students");
        }
    }  
}

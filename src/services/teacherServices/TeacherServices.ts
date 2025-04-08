import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";

export class TeachersService {

    async getAllTeachers(page: number, limit: number, classId?: number, search?: string, gender?: string) {
        try {
            const skip = (page - 1) * limit;

            // Dynamic `where` object
            const whereClause: Prisma.TeacherWhereInput = {};

            if (classId) {
                whereClause.lessons = {
                    some: {
                        classId: classId,
                    },
                };
            }

            if (gender) {
                whereClause.sex = gender as Prisma.EnumUserSexFilter;
            }

            if (search) {
                whereClause.OR = [
                    { username: { contains: search, mode: "insensitive" } },
                    { surname: { contains: search, mode: "insensitive" } },
                    { email: { contains: search, mode: "insensitive" } },
                ];
            }

            const [teachers, total] = await Promise.all([
                prisma.teacher.findMany({
                    where: whereClause,
                    include: {
                        subjects: true,
                        classes: true,
                    },
                    take: limit,
                    skip: skip,
                }),
                prisma.teacher.count({
                    where: whereClause,
                }),
            ]);

            return {
                data: teachers,
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
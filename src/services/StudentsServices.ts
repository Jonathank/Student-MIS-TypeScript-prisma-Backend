import { Prisma, UserSex } from "@prisma/client";
import prisma from "../lib/prisma";
import { parseEnumValue } from "../utils/ParseEnumValues";

export class StudentsService {
    
    async getAllStudents(
        page: number,
        limit: number,
        classId?: number,
        search?: string,
        gender?: string,
        teacherId?: string
    ) {
        try {
            const skip = (page - 1) * limit;
            const whereClause: Prisma.StudentWhereInput = {};

            // Filter by gender
            const genderEnum = parseEnumValue(UserSex, gender);
            if (genderEnum) {
                whereClause.sex = genderEnum;
            }

            // Filter by search
            if (search) {
                whereClause.OR = [
                    {id : {contains : search, mode: "insensitive"}},
                    { username: { contains: search, mode: "insensitive" } },
                    { surname: { contains: search, mode: "insensitive" } },
                    { email: { contains: search, mode: "insensitive" } },
                ];
            }

            // Filter students by teacherId via lesson > classId
            if (teacherId) {
                whereClause.class = {
                    lessons: {
                        some: {
                            teacherId: teacherId
                        }
                    }
                };
            }

            // Apply classId filter directly (but after teacher filter is safe)
            if (classId) {
                whereClause.classId = classId;
            }

            const [students, total] = await Promise.all([
                prisma.student.findMany({
                    where: whereClause,
                    include: {
                        grade: true,
                        class: true,
                    },
                    take: limit,
                    skip,
                }),
                prisma.student.count({ where: whereClause }),
            ]);

            return {
                data: students,
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


    async getStudentById(id: string, page: number, limit: number) {
        try {
            const skip = (page - 1) * limit;

            const whereClause: Prisma.StudentWhereUniqueInput = { id };
            const [student, total] = await Promise.all([
                prisma.student.findUnique({
                    where: whereClause,
                    include: {
                        grade: true,
                        class: true,
                    },
                }),
                prisma.student.count({ where: whereClause })
            ]);

            return {
                data: student,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        } catch (error: unknown) {
            console.error("Error retrieving student:", error);
            throw new Error("Failed to fetch student");
        }
    }
       
}
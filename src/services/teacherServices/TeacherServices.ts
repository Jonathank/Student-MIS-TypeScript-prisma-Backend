
import prisma from "../../lib/prisma";

export class TeachersService {

    // In your TeachersService.ts
    async getAllTeachers() {
        try {
           return await prisma.teacher.findMany();
        } catch (error: unknown) {
            console.error('Error retrieving teachers:', error);
        }
    }
}

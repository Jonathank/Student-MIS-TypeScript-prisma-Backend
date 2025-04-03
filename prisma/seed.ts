import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Create Admins
    await prisma.admin.createMany({
      data: [
        { id: 'admin1', username: 'Admin1' },
        { id: 'admin2', username: 'Admin2' },
      ],
    });

    // Create Parents
    const parents = [];
    for (let i = 1; i <= 8; i++) {
      const parent = await prisma.parent.create({
        data: {
          id: `p${i}`,
          username: `parent${i}`,
          surname: `Doe${i}`,
          email: `parent${i}@example.com`,
          phone: `12345678${i}0`,
          address: "123 Main St",
          bloodType: "O+",
          sex: i % 2 === 0 ? "MALE" : "FEMALE",
        },
      });
      parents.push(parent);
    }

    // Create Grades
    await prisma.grade.createMany({
      data: Array.from({ length: 6 }, (_, i) => ({
        level: i + 1,
      })),
    });

    const grade1 = await prisma.grade.findFirst({
      where: { level: 1 },
    });

    // Create Teacher
    const teacher1 = await prisma.teacher.create({
      data: {
        id: "teacher1",
        username: "teacher1",
        surname: "Smith",
        email: "teacher1@example.com",
        phone: "0987654321",
        address: "456 Elm St",
        bloodType: "A+",
        sex: "FEMALE",
      },
    });

    // Create Subjects
    await prisma.subject.createMany({
      data: [
        { name: "Mathematics" },
        { name: "Science" },
        { name: "History" },
        { name: "Geography" },
        { name: "English" },
        { name: "Physics" },
        { name: "Chemistry" },
        { name: "Biology" },
      ],
    });

    const subjects = await prisma.subject.findMany();

    // Create Class
    const class1 = await prisma.class.create({
      data: {
        name: "Class 1A",
        capacity: 30,
        supervisorId: teacher1.id,
        gradeId: grade1?.id ?? (() => { throw new Error("Grade 1 not found"); })(),
      },
    });

    // Create Students
    for (let i = 1; i <= 8; i++) {
      await prisma.student.create({
        data: {
          id: `s${i}`,
          username: `student${i}`,
          surname: `Student${i}`,
          email: `student${i}@example.com`,
          phone: `11122233${i}3`,
          address: "789 Oak St",
          bloodType: "B+",
          sex: i % 2 === 0 ? "MALE" : "FEMALE",
          parentId: parents[i % parents.length].id,
          classId: class1.id,
          gradeId: grade1.id,
        },
      });
    }

    // Create Lesson
    const lesson1 = await prisma.lesson.create({
      data: {
        name: "Algebra Basics",
        day: "MONDAY",
        startTime: new Date("2025-04-01T08:00:00Z"),
        endTime: new Date("2025-04-01T09:30:00Z"),
        subjectId: subjects[0].id,
        classId: class1.id,
        teacherId: teacher1.id,
      },
    });

    // Create Exam
    await prisma.exam.create({
      data: {
        title: "Math Test 1",
        startTime: new Date("2025-04-15T10:00:00Z"),
        endTime: new Date("2025-04-15T11:30:00Z"),
        lessionId: lesson1.id,
      },
    });

    // Create Assignment
    await prisma.assignment.create({
      data: {
        title: "Science Project",
        startDate: new Date("2025-04-10T00:00:00Z"),
        dueDate: new Date("2025-04-20T23:59:59Z"),
        lessionId: lesson1.id,
      },
    });

    // Create Attendance
    await prisma.attendance.create({
      data: {
        date: new Date("2025-04-01"),
        present: true,
        studentId: "s1",
        lessionId: lesson1.id,
      },
    });

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

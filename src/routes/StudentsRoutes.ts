
import { Router } from "express";
import { StudentsController } from "../controllers/StudentsController";

const StudentsRoutes = Router();

const studentsController = new StudentsController();

StudentsRoutes.get("/students", (req, res) => studentsController.getAllStudents(req, res));
// router.get("/:id", teachersController.getTeacherById);
// router.post("/", teachersController.createTeacher);
// router.put("/:id", teachersController.updateTeacher);
// router.delete("/:id", teachersController.deleteTeacher);
export default StudentsRoutes;
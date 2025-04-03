import { Router } from "express";
import { TeachersController } from "../controllers/TeacherController";

const TeacherRoutes = Router();

const teachersController = new TeachersController();

TeacherRoutes.get("/teachers", (req, res) => teachersController.getAllTeachers(req, res));
// router.get("/:id", teachersController.getTeacherById);
// router.post("/", teachersController.createTeacher);
// router.put("/:id", teachersController.updateTeacher);
// router.delete("/:id", teachersController.deleteTeacher);

export default TeacherRoutes;
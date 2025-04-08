import { Router } from "express";
import { TeachersController } from "../controllers/TeacherController";

const TeacherRoutes = Router();

const teachersController = new TeachersController();

TeacherRoutes.get("/teachers", (req, res) => teachersController.getAllTeachers(req, res));
TeacherRoutes.get("/teachers/:id", (req, res) => teachersController.getTeacherById(req, res));
export default TeacherRoutes;
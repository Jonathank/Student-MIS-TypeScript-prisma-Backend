
import { Router } from "express";
import { StudentsController } from "../controllers/StudentsController";

const StudentsRoutes = Router();

const studentsController = new StudentsController();

StudentsRoutes.get("/students", (req, res) => studentsController.getAllStudents(req, res));



export default StudentsRoutes;
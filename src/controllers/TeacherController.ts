import { Request, Response } from "express";
import { TeachersService } from "../services/teacherServices/TeacherServices";
import { HttpResponse } from "../domain/Response";
import { Code } from "../enum/Code.enum";
import { Status } from "../enum/Status.enum";

export class TeachersController {

    private teachersService: TeachersService;

    constructor() {
        this.teachersService = new TeachersService();
    }

    public getAllTeachers = async (req: Request, res: Response): Promise<any> => {
            console.info(`[${new Date().toLocaleString()}] Incoming ${req.method} ${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
        try {
                const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const teachers = await this.teachersService.getAllTeachers(page, limit);
               
               return res.status(Code.OK)
                    .json(new HttpResponse(Code.OK, Status.OK, 'Teachers retrieved', teachers));
            } catch(error: unknown) {
                console.error('Error retrieving teachers:', error);

              return  res.status(Code.INTERNAL_SERVER_ERROR)
                    .json(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
            }
        }
       

    // Add other teacher-related controller methods here
    // For example:
    // public getTeacherById = async (req: Request, res: Response): Promise<void> => {
    //   await this.teachersService.getTeacherById(req, res);
    // }
    //
    // public createTeacher = async (req: Request, res: Response): Promise<void> => {
    //   await this.teachersService.createTeacher(req, res);
    // }
    //
    // public updateTeacher = async (req: Request, res: Response): Promise<void> => {
    //   await this.teachersService.updateTeacher(req, res);
    // }
    //
    // public deleteTeacher = async (req: Request, res: Response): Promise<void> => {
    //   await this.teachersService.deleteTeacher(req, res);
    // }
}
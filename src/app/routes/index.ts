import { Router } from "express";
import { StudentRouter } from "../modules/students/student.routes";
import { userRouter } from "../modules/user/user.routes";
import { AcademicSemesterRoute } from "../modules/academicSemester/academic.semester.routes";
import { academicFacultyRouter } from "../modules/academicFaculty/academicFaculty.routes";

const router = Router()

const moduleRoutes = [
    {
        path : '/students',
        route : StudentRouter
    },
    {
        path : '/user',
        route : userRouter
    },
    {
        path : '/semester',
        route : AcademicSemesterRoute
    },
    {
        path : '/faculty',
        route : academicFacultyRouter
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
import { Router } from "express";
import { StudentRouter } from "../modules/students/student.routes";
import { userRouter } from "../modules/user/user.routes";
import { AcademicSemesterRoute } from "../modules/academicSemester/academic.semester.routes";
import { academicFacultyRouter } from "../modules/academicFaculty/academicFaculty.routes";
import { academicDepartmentRouter } from "../modules/academicDepartment/academicDepartment.routes";
import { FacultyRouter } from "../modules/Faculty/faculty.routes";
import { AdminRoutes } from "../modules/Admin/admin.routes";
import { courseRouter } from "../modules/course/course.routes";

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
        path : '/academicFaculty',
        route : academicFacultyRouter
    },
    {
        path : '/department',
        route : academicDepartmentRouter
    },
    {
        path : '/faculty',
        route : FacultyRouter
    },
    {
        path : '/admin',
        route : AdminRoutes
    },
    {
        path : '/course',
        route : courseRouter
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
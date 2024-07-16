import { Router } from "express";
import { StudentRouter } from "../modules/students/student.routes";
import { userRouter } from "../modules/user/user.routes";
import { AcademicSemesterRoute } from "../modules/academicSemester/academic.semester.routes";
import { academicFacultyRouter } from "../modules/academicFaculty/academicFaculty.routes";
import { academicDepartmentRouter } from "../modules/academicDepartment/academicDepartment.routes";
import { FacultyRouter } from "../modules/Faculty/faculty.routes";
import { AdminRoutes } from "../modules/Admin/admin.routes";
import { courseRouter } from "../modules/course/course.routes";
import { semesterRegistrationRouter } from "../modules/semesterRegistration/semesterRegistration.routes";
import { offerCourseRouter } from "../modules/OfferedCourse/OfferedCourse.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { enrolledCourseRouter } from "../modules/enrolledCourse/enrolledCourse.routes";

const router = Router()

const moduleRoutes = [
    {
        path: '/students',
        route: StudentRouter
    },
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/semester',
        route: AcademicSemesterRoute
    },
    {
        path: '/academicFaculty',
        route: academicFacultyRouter
    },
    {
        path: '/department',
        route: academicDepartmentRouter
    },
    {
        path: '/faculty',
        route: FacultyRouter
    },
    {
        path: '/admin',
        route: AdminRoutes
    },
    {
        path: '/course',
        route: courseRouter
    },
    {
        path: '/semester-registrations',
        route: semesterRegistrationRouter,
    },
    {
        path: '/offered-course',
        route: offerCourseRouter,
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/enrolled-courses',
        route: enrolledCourseRouter,
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
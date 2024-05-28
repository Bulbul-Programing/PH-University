import { Router } from "express";
import { StudentRouter } from "../modules/students/student.routes";
import { userRouter } from "../modules/user/user.routes";

const router = Router()

const moduleRoutes = [
    {
        path : '/students',
        route : StudentRouter
    },
    {
        path : '/user',
        route : userRouter
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
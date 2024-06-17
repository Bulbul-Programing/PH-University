import express from 'express'
import { offerCourseController } from './OfferedCourse.controller'


const router = express.Router()

router.post('/create-offeredCourse', offerCourseController.createOfferedCourse)


export const offerCourseRouter = router
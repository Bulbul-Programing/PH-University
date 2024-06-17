import express from 'express'
import { offerCourseController } from './OfferedCourse.controller'
import validateRequest from '../../middleware/validateRequestData'
import { OfferedCourseValidations } from './OfferedCourse.validation'


const router = express.Router()

router.post('/create-offeredCourse',validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema), offerCourseController.createOfferedCourse)

router.patch('/:id', validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema), offerCourseController.updateOfferedCourse)

export const offerCourseRouter = router
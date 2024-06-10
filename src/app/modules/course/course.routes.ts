import express from 'express';
import validateRequest from '../../middleware/validateRequestData';
import { CourseValidation } from './course.validation';
import { courseController } from './course.controller';


const router = express.Router()

router.post('/create-course', validateRequest(CourseValidation.createCourseValidationSchema), courseController.createCourse)
router.get('/', courseController.getAllCourse)
router.get('/:id', courseController.getSingleCourse)
router.delete('/:id', courseController.deleteCourse)

export const courseRouter = router

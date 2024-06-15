import express from 'express';
import validateRequest from '../../middleware/validateRequestData';
import { CourseValidation } from './course.validation';
import { courseController } from './course.controller';


const router = express.Router()

router.post('/create-course', validateRequest(CourseValidation.createCourseValidationSchema), courseController.createCourse)
router.get('/', courseController.getAllCourse)
router.get('/:id', courseController.getSingleCourse)
router.delete('/:id', courseController.deleteCourse)
router.patch('/:id',validateRequest(CourseValidation.updateCourseValidationSchema) ,courseController.updateCourse)
router.put('/:courseId/assign-faculties',validateRequest(CourseValidation.assignCourseFacultyValidationSchema), courseController.assignFaculties)
router.delete('/:courseId/remove-faculties',validateRequest(CourseValidation.removeCourseFacultyValidationSchema), courseController.removeFaculties)

export const courseRouter = router

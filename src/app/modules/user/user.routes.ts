import express from 'express'
import { userController } from './user.controller'
import { studentValidation } from '../students/student.validation'
import validateRequest from '../../middleware/validateRequestData'
import { FacultyValidationSchema } from '../Faculty/faculty.validation'

const router = express.Router()

router.post(
  '/users/create-student',
  validateRequest(studentValidation.createStudentValidationSchema),
  userController.createStudent,
)

router.post('/users/create-faculty',validateRequest(FacultyValidationSchema.createFacultySchema), userController.createFaculty)

export const userRouter = router

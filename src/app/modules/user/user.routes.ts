import express from 'express'
import { userController } from './user.controller'
import { studentValidation } from '../students/student.validation'
import validateRequest from '../../middleware/validateRequestData'

const router = express.Router()

router.post(
  '/users/create-student',
  validateRequest(studentValidation.createStudentValidationSchema),
  userController.createStudent,
)

export const userRouter = router

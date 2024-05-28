import express from 'express'
import { userController } from './user.controller'
import studentValidationSchema from '../students/student.validation'
import validateRequest from '../../middleware/validateRequestData'

const router = express.Router()


router.post(
  '/users/create-student',
  validateRequest(studentValidationSchema),
  userController.createStudent,
)

export const userRouter = router

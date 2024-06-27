import express from 'express'
import { userController } from './user.controller'
import { studentValidation } from '../students/student.validation'
import validateRequest from '../../middleware/validateRequestData'
import { FacultyValidationSchema } from '../Faculty/faculty.validation'
import { createAdminValidationSchema } from '../Admin/admin.validation'
import auth from '../../middleware/auth'
import { userValidation } from './user.validation'

const router = express.Router()

router.post(
  '/users/create-student',
  validateRequest(studentValidation.createStudentValidationSchema),
  userController.createStudent,
)

router.post('/users/create-faculty',validateRequest(FacultyValidationSchema.createFacultySchema), userController.createFaculty)
router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  userController.createAdmin,
  
);

router.get('/me', auth('student', 'admin', 'faculty'), userController.getMe)

router.post('/change-status/:id', auth('admin'), validateRequest(userValidation.changeStatus), userController.changeStatus)


export const userRouter = router

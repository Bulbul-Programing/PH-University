import express, { NextFunction, Request, Response } from 'express'
import { userController } from './user.controller'
import { studentValidation } from '../students/student.validation'
import validateRequest from '../../middleware/validateRequestData'
import { FacultyValidationSchema } from '../Faculty/faculty.validation'
import { createAdminValidationSchema } from '../Admin/admin.validation'
import auth from '../../middleware/auth'
import { userValidation } from './user.validation'
import { upload } from '../../utils/sendImageToCloudinary'

const router = express.Router()

router.post(
  '/create-student',
  auth('admin'),
  upload.single('file'),
  (req : Request, res : Response, next:NextFunction)=>{
    console.log(req.body.data);
    req.body = JSON.parse(req.body.data)
    next()
  },
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

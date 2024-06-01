import express from 'express'
import { academicDepartmentController } from './academicDepartment.controller'
import validateRequest from '../../middleware/validateRequestData'
import { academicDepartmentValidation } from './academicDepartment.validation'

const router = express.Router()

router.post('/create-department', validateRequest(academicDepartmentValidation.createAcademicDepartmentValidationSchema), academicDepartmentController.createAcademicDepartment)
router.get('/', academicDepartmentController.getAllAcademicDepartment)
router.get('/:departmentId', academicDepartmentController.getSingleAcademicDepartment)
router.patch('/:departmentId', academicDepartmentController.updateAcademicDepartment)

export const academicDepartmentRouter = router
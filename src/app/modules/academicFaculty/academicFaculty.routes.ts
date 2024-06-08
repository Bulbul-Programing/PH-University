import express from 'express'
import validateRequest from '../../middleware/validateRequestData'
import { AcademicFacultyValidation } from './academicFaculty.validation'
import { academicFacultyController } from './academicFaculty.controller'

const router = express.Router()

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.academicFacultyValidation),
  academicFacultyController.createAcademicFaculty,
)
router.get('/', academicFacultyController.getAllAcademicFaculty)
router.get('/:facultyId', academicFacultyController.getSingleAcademicFaculty)
router.patch('/:facultyId', academicFacultyController.updateAcademicFaculty)

export const academicFacultyRouter = router

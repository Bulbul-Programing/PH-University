import express from 'express'
import { AcademicSemesterController } from './academic.semester.controller'
import validateRequest from '../../middleware/validateRequestData'
import { academicSemesterValidations } from './academic.semester.validation'
import auth from '../../middleware/auth'

const router = express.Router()

router.post('/create-academic-semester',validateRequest(academicSemesterValidations.createAcademicSemesterValidationSchema), AcademicSemesterController.createAcademicSemester)
router.get('/', auth('admin'), AcademicSemesterController.getAllAcademicSemester)
router.get('/:semesterId', AcademicSemesterController.singleAcademicSemester)
router.patch('/:semesterId',validateRequest(academicSemesterValidations.updateAcademicSemesterValidationSchema), AcademicSemesterController.updateAcademicSemester)

export const AcademicSemesterRoute = router
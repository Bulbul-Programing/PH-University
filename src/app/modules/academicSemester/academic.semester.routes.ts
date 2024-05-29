import express from 'express'
import { AcademicSemesterController } from './academic.semester.controller'
import validateRequest from '../../middleware/validateRequestData'
import { academicSemesterValidations } from './academic.semester.validation'

const router = express.Router()

router.post('/create-academic-semester',validateRequest(academicSemesterValidations.createAcademicSemesterValidationSchema), AcademicSemesterController.createAcademicSemester)


export const AcademicSemesterRoute = router
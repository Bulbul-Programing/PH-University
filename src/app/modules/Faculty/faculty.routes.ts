import express from 'express'
import { FacultyController } from './faculty.controller'
import validateRequest from '../../middleware/validateRequestData'
import { FacultyValidationSchema } from './faculty.validation'


const router = express.Router()

router.get('/', FacultyController.getAllFaculty)
router.get('/:facultyId', FacultyController.getSingleFaculty)
router.patch('/:facultyId',validateRequest(FacultyValidationSchema.updateFacultySchema), FacultyController.updateFaculty)
router.delete('/:facultyId', FacultyController.deleteFaculty)

export const FacultyRouter = router
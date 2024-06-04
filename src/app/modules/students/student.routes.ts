import express from 'express'
import { studentControllers } from './student.controller'
import { studentValidation } from './student.validation'
import validateRequest from '../../middleware/validateRequestData'

const router = express.Router()
// will call controller file
// router.post('/create-student', studentControllers.createStudent)
router.get('/', studentControllers.getStudents)
router.get('/:studentId', studentControllers.getSingleStudent)
router.patch('/:studentId',validateRequest(studentValidation.updateStudentValidationSchema), studentControllers.updateStudent)
router.delete('/:studentId', studentControllers.deletedStudent)

export const StudentRouter = router
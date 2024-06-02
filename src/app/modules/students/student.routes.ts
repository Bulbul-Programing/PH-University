import express from 'express'
import { studentControllers } from './student.controller'

const router = express.Router()
// will call controller file
// router.post('/create-student', studentControllers.createStudent)
router.get('/', studentControllers.getStudents)
router.get('/:studentId', studentControllers.getSingleStudent)
router.patch('/:studentId', studentControllers.deletedStudent)

export const StudentRouter = router
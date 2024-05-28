import { NextFunction, Request, RequestHandler, Response, response } from 'express'
import { studentService } from './student.service'
import catchAsync from '../../utils/catchAsync'

const getStudents  = catchAsync(async (req, res, next) => {
    const result = await studentService.getAllStudentsFromDB()

    res.status(200).json({
      success: true,
      massage: 'Student data send successfully',
      data: result,
    })
})

const getSingleStudent = async (req: Request, res: Response, next : NextFunction) => {
  try {
    const {studentId} = req.params
    const result = await studentService.getSingleStudentDataFromDB(studentId)
    res.status(200).json({
      success: true,
      massage: ' Single Student data send successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const studentControllers = {
  getStudents,
  getSingleStudent
}

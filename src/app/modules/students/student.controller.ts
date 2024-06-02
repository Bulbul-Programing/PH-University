import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  response,
} from 'express'
import { studentService } from './student.service'
import catchAsync from '../../utils/catchAsync'
import AppError from '../../error/AppError'

const getStudents = catchAsync(async (req, res, next) => {
  const result = await studentService.getAllStudentsFromDB()

  res.status(200).json({
    success: true,
    massage: 'Student data send successfully',
    data: result,
  })
})

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params
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

const deletedStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params
  const result = await studentService.deleteStudentFromDB(studentId)
  if(!result){
    throw new AppError(404, 'student dose not exist')
  }
  res.status(200).json({
    success: true,
    massage: ' Single Deleted successfully',
    data: result,
  })
})

export const studentControllers = {
  getStudents,
  getSingleStudent,
  deletedStudent
}

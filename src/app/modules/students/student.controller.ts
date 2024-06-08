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
  const query = req.query
  const result = await studentService.getAllStudentsFromDB(query)
  
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

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params
  const {student} = req.body
  const result = await studentService.updateStudentFromDB(studentId, student)
  
  if(!result){
    throw new AppError(404, 'student dose not exist')
  }
  
  res.status(200).json({
    success: true,
    massage: ' Single Deleted successfully',
    data: result,
  })
})

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
  updateStudent,
  deletedStudent
}

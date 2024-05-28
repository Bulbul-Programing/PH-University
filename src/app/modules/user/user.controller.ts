import { NextFunction, Request, Response } from 'express'
import { userService } from './user.service'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student } = req.body

    // will call service function for to send data
    const result = await userService.createStudentIntoDB(password, student)
    // send response

    if (result?.errors) {
      res.status(500).json({
        success: false,
        massage: 'student creation failed',
        data: result,
      })
    } else {
      res.status(200).json({
        success: true,
        massage: 'Student is create successfully',
        data: result,
      })
    }
  } catch (err) {
    next(err)
  }
}

export const userController = {
  createStudent,
}

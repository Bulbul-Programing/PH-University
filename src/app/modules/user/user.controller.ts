import { NextFunction, Request, Response } from 'express'
import { userService } from './user.service'
import AppError from '../../error/AppError'
import catchAsync from '../../utils/catchAsync'

// const createStudent = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {

//   try {
//     const { password, student } = req.body
//     // will call service function for to send data
//     const result = await userService.createStudentIntoDB(password, student)
//     // send response
//     res.status(200).json({
//       success: true,
//       massage: 'Student is create successfully',
//       data: result,
//     })
//   } catch (err) {
//     next(err)
//   }
// }
const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body

  const result = await userService.createStudentIntoDB(
    req.file,
    password,
    studentData,
  )

  res.status(200).json({
    success: true,
    massage: 'Student is create successfully',
    data: result,
  })
})

const createFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, faculty } = req.body
    const result = await userService.createFacultyIntoDB(password, faculty)

    if (result) {
      res.status(200).json({
        success: true,
        massage: 'Faculty is create successfully',
        data: result,
      })
    } else {
      throw new AppError(500, 'something want wrong')
    }
  } catch (err) {
    next(err)
  }
}

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { password, admin: adminData } = req.body

  const result = await userService.createAdminIntoDB(password, adminData)

  res.status(200).json({
    success: true,
    message: 'Admin is created successfully',
    data: result,
  })
})

const getMe = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization

  if (!token) {
    throw new AppError(404, 'Token not found!')
  }
  const result = await userService.getMe(token)

  res.status(200).json({
    success: true,
    message: 'data retrieve successfully',
    data: result,
  })
})

const changeStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const status = req.body

  const result = await userService.changeStatusIntoDB(id, status)

  res.status(200).json({
    success: true,
    message: 'user Status change successfully',
    data: result,
  })
})

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
}

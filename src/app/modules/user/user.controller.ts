import { NextFunction, Request, Response } from 'express'
import { userService } from './user.service'
import AppError from '../../error/AppError'
import catchAsync from '../../utils/catchAsync'

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
    res.status(200).json({
      success: true,
      massage: 'Student is create successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const createFaculty = async(req : Request, res: Response, next : NextFunction) => {
  try{
    const {password, faculty} = req.body
    const result = await userService.createFacultyIntoDB(password, faculty)

    if(result){
      res.status(200).json({
        success: true,
        massage: 'Student is create successfully',
        data: result,
      })
    }
    else{
      throw new AppError(500, 'something want wrong')
    } 
  }
  catch(err){
    next(err)
  }
}

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await userService.createAdminIntoDB(password, adminData);

  res.status(200).json({
    success: true,
    message: 'Admin is created successfully',
    data : result
  })
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin
}

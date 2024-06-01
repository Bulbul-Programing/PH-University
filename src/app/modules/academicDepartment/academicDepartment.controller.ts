import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { academicDepartmentService } from './academicDepartment.service'

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const departmentData = req.body
    const result =
      await academicDepartmentService.createAcademicDepartmentIntoDb(
        departmentData,
      )

    res.status(200).json({
      success: true,
      message: 'Department create successfully',
      data: result,
    })
  },
)

const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicDepartmentService.getAllAcademicDepartmentIntoDb()

    res.status(200).json({
      success: true,
      message: 'Department all data fetch successfully',
      data: result,
    })
  },
)

const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const departmentId = req.params.departmentId
    const result =
      await academicDepartmentService.getSingleAcademicDepartmentIntoDb(
        departmentId,
      )
    if (result === null) {
      throw new Error('Department Id is invalid')
    } else {
      res.status(200).json({
        success: true,
        message: 'single Department fetch successfully',
        data: result,
      })
    }
  },
)

const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const departmentId = req.params.departmentId
    const updateData = req.body
    const result =
      await academicDepartmentService.updateAcademicDepartmentIntoDb(
        departmentId,
        updateData,
      )

    res.status(200).json({
      success: true,
      message: 'Department update successfully',
      data: result,
    })
  },
)

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
}

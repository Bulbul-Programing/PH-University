import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { academicFacultyService } from './academicFaculty.service'
import { ZodError } from 'zod'

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const facultyData = req.body
    const result =
      await academicFacultyService.createAcademicFacultyIntoDb(facultyData)
    res.status(200).json({
      success: true,
      message: 'Academic faculty create successfully',
      data: result,
    })
  },
)

const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyService.getAllAcademicFacultyIntoDb()
    res.status(200).json({
      success: true,
      message: 'Academic faculty data fetch successfully',
      data: result,
    })
  },
)

const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const facultyId = req.params.facultyId
    const result =
      await academicFacultyService.getSingleAcademicFacultyIntoDb(facultyId)
    res.status(200).json({
      success: true,
      message: ' single Academic faculty data fetch successfully',
      data: result,
    })
  },
)

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const facultyId = req.params.facultyId
    const updateData = req.body
    const result = await academicFacultyService.updateAcademicFacultyIntoDb(
      facultyId,
      updateData,
    )

    res.status(200).json({
      success: true,
      message: 'Academic faculty update successfully',
      data: result,
    })

  },
)


export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty
}

import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { AcademicSemesterService } from './academic.semester.service'

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const semesterData = req.body
    const result =
      await AcademicSemesterService.createAcademicSemesterIntoDb(semesterData)

    res.status(200).json({
      success: true,
      message: 'Academic semester create successfully',
      data: result,
    })
  },
)

const getAllAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicSemesterService.allAcademicSemesterIntoDb()
    res.status(200).json({
      success: true,
      message: 'Academic semester fetch successfully',
      data: result,
    })
  },
)

const singleAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const semesterId = req.params.semesterId
    const result =
      await AcademicSemesterService.singleAcademicSemesterIntoDb(semesterId)
    res.status(200).json({
      success: true,
      message: 'single semester fetch successfully',
      data: result,
    })
  },
)

const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const semesterId = req.params.semesterId
    const result = await AcademicSemesterService.updateAcademicSemesterIntoDB(
      semesterId,
      req.body,
    )
    res.status(200).json({
      success: true,
      message: 'single semester update successfully',
      data: result,
    })
  },
)

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  singleAcademicSemester,
  updateAcademicSemester
}

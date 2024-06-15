import { Request, Response } from 'express'
import { courseService } from './course.service'
import catchAsync from '../../utils/catchAsync'

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const courseData = req.body
  const result = await courseService.cerateCourseIntoDB(courseData)

  res.status(200).json({
    success: true,
    message: 'course create successfully',
    data: result,
  })
})

const getAllCourse = catchAsync(async (req: Request, res: Response) => {
  const query = req.query
  const result = await courseService.getAllCourseIntoDB(query)

  res.status(200).json({
    success: true,
    message: 'all course are retrieved successfully',
    data: result,
  })
})

const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await courseService.getSingleCourseIntoDB(id)

  res.status(200).json({
    success: true,
    message: 'single course retrieved successfully',
    data: result,
  })
})

const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await courseService.deleteCourseIntoDB(id)

  res.status(200).json({
    success: true,
    message: 'course deleted successfully',
    data: result,
  })
})

const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const courseData = req.body
  const result = await courseService.updateCourseIntoDB(id, courseData)

  res.status(200).json({
    success: true,
    message: 'course update successfully',
    data: result,
  })
})

const assignFaculties = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const { faculties } = req.body

  const result = await courseService.assignFacultiesWithCourseIntoDB(courseId, faculties)
  res.status(200).json({
    success: true,
    message: 'course faculty create successfully',
    data: result,
  })
})

const removeFaculties = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const { faculties } = req.body

  const result = await courseService.removeFacultiesWithCourseIntoDB(courseId, faculties)
  res.status(200).json({
    success: true,
    message: 'course faculty remove successfully',
    data: result,
  })
})

export const courseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFaculties,
  removeFaculties
}

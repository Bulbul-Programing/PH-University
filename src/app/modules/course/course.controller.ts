import { Request, Response } from 'express'
import { courseService } from './course.service'

const createCourse = async (req: Request, res: Response) => {
  const courseData = req.body
  const result = await courseService.cerateCourseIntoDB(courseData)

  res.status(200).json({
    success: true,
    message: 'course create successfully',
    data: result,
  })
}

const getAllCourse = async (req: Request, res: Response) => {
  const result = await courseService.getAllCourseIntoDB()

  res.status(200).json({
    success: true,
    message: 'all course are retrieved successfully',
    data: result,
  })
}

const getSingleCourse = async (req: Request, res: Response) => {
    const {id} = req.params
    const result = await courseService.getSingleCourseIntoDB(id)

  res.status(200).json({
    success: true,
    message: 'single course retrieved successfully',
    data: result,
  })
}

const deleteCourse = async (req: Request, res: Response) => {
    const {id} = req.params
    const result = await courseService.deleteCourseIntoDB(id)

  res.status(200).json({
    success: true,
    message: 'single course retrieved successfully',
    data: result,
  })
}

export const courseController = {
    createCourse,
    getAllCourse,
    getSingleCourse,
    deleteCourse
}

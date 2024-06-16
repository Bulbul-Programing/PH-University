import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { courseSearchAbleFields } from './course.const'
import { TCourse, TCourseFaculty } from './course.interface'
import { CourseFacultyModel, courseModel } from './course.model'
import AppError from '../../error/AppError'

const cerateCourseIntoDB = async (payload: TCourse) => {
  const result = await courseModel.create(payload)
  return result
}

const getAllCourseIntoDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    courseModel.find().populate('preRequisiteCourse.course'),
    query,
  )
    .searching(courseSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await courseQuery.modelQuery
  return result
}

const getSingleCourseIntoDB = async (id: string) => {
  const result = await courseModel
    .findById(id)
    .populate('preRequisiteCourse.course')
  return result
}

const deleteCourseIntoDB = async (id: string) => {
  const result = await courseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

const updateCourseIntoDB = async (id: string, payload: TCourse) => {
  const { preRequisiteCourse, ...BasicCourseInfo } = payload
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const updateRemainingCourse = await courseModel.findByIdAndUpdate(
      id,
      BasicCourseInfo,
      { new: true, runValidators: true, session },
    )

    if (!updateRemainingCourse) {
      throw new AppError(500, 'Failed to update course.')
    }

    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
      const deletedPreRequisite = preRequisiteCourse
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course)

      const deletedPreRequisiteCourse = await courseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourse: { course: { $in: deletedPreRequisite } },
          },
        },
        { new: true, session },
      )

      if (!deletedPreRequisiteCourse) {
        throw new AppError(500, 'Failed to update course.')
      }

      const newPreRequisite = preRequisiteCourse.filter(
        (el) => el.course && !el.isDeleted,
      )

      const newPreRequisiteCourse = await courseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourse: { $each: newPreRequisite } },
        },
        { new: true, session },
      )

      if (!newPreRequisiteCourse) {
        throw new AppError(500, 'Failed to update course.')
      }

      const updateData = await courseModel
        .findById(id)
        .populate('preRequisiteCourse.course')

      session.commitTransaction()
      session.endSession()

      return updateData
    }
  } catch (err) {
    session.abortTransaction()
    session.endSession()
    throw new AppError(500, 'Failed to update course.')
  }
}

const assignFacultiesWithCourseIntoDB = async (id: string, payload: TCourseFaculty) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(id, {
    course: id,
    $addToSet: { faculties: { $each: payload } } 
  }, { upsert: true, new: true }) 
  
  return result 

}

const removeFacultiesWithCourseIntoDB = async (id: string, payload: TCourseFaculty) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(id, {
    $pull: { faculties: { $in: payload } }
  }, { new: true }) 

  return result

}

export const courseService = {
  cerateCourseIntoDB,
  getAllCourseIntoDB,
  getSingleCourseIntoDB,
  deleteCourseIntoDB,
  updateCourseIntoDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesWithCourseIntoDB,
}

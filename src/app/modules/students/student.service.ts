import { error } from 'console'
import { TStudents } from './student.interface'
import { Student } from './student.model'
import mongoose from 'mongoose'
import AppError from '../../error/AppError'
import { userModel } from '../user/user.model'
import { object } from 'zod'
import QueryBuilder from '../../builder/QertyBuilder'

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // let searchTerm = ''
  // const queryObj = {...query}
  // if(query?.searchTerm){
  //   searchTerm = query.searchTerm as string
  // }
  const studentSearchAbleFields: string[] = [
    'name.lastName',
    'name.middleName',
    'name.lastName',
    'email',
    'presentAddress',
  ]

  // const searchQuery = Student.find({
  //   $or : studentSearchAbleFields.map((field)=>({
  //     [field] : {$regex : searchTerm, $options : 'i'}
  //   }))
  // })

  // const excludeFields : string[] = ['searchTerm','sort', 'limit', 'page', 'fields']
  // excludeFields.forEach(el => delete queryObj[el])

  // const filterSearch = searchQuery.find(queryObj)
  // .populate('admissionSemester')
  // .populate('academicFaculty')
  // .populate({
  //   path: 'academicDepartment',
  //   populate: {
  //     path: 'academicFaculty',
  //   },
  // })

  // let sort :string = '-createdAt'

  // if(query.sort){
  //   sort = query.sort as string
  // }
  // const sortQuery = filterSearch.sort(sort)

  // let limit = 10
  // let page = 1
  // let skip = 0

  // if(query.limit){
  //   limit = Number(query.limit)
  // }

  // if(query.page){
  //   page = Number(query.page)
  //   skip = (page - 1)*limit
  // }

  // const paginateQuery = sortQuery.skip(skip)
  // const limitQuery = paginateQuery.limit(limit)

  // let fields = '-__v'

  // if(query.fields){
  //   fields = (query.fields as string).split(',').join(' ')
  // }

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate('academicFaculty')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .searching(studentSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await studentQuery.modelQuery
  return result
}

const getSingleStudentDataFromDB = async (id: string) => {
  const result = await Student.findOne({ id: id })
    .populate('admissionSemester')
    .populate('academicFaculty')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}

const updateStudentFromDB = async (id: string, payload: Partial<TStudents>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdateData, {
    new: true,
  })
  return result
}

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(400, 'Failed to delete Student')
    }

    const userDelete = await userModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )
    if (!userDelete) {
      throw new AppError(400, 'Failed to delete user')
    }
    await session.commitTransaction()
    await session.endSession()

    return deletedStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
  }
}

export const studentService = {
  getAllStudentsFromDB,
  getSingleStudentDataFromDB,
  updateStudentFromDB,
  deleteStudentFromDB,
}

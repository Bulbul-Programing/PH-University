import mongoose from 'mongoose'
import config from '../../config'
import { academicSemesterModel } from '../academicSemester/academic.semester.model'
import { TStudents } from '../students/student.interface'
import { Student } from '../students/student.model'
import { TNewUser } from './user.interface'
import { userModel } from './user.model'
import { generateId } from './user.utils'
import AppError from '../../error/AppError'

const createStudentIntoDB = async (
  password: string,
  studentData: TStudents,
) => {
  const academicSemester = await academicSemesterModel.findById(
    studentData.admissionSemester,
  )

  const session = await mongoose.startSession()
  try {

    session.startTransaction()

    if (academicSemester) {
      const userId: string = await generateId(academicSemester)

      const user: TNewUser = {
        id: userId,
        password: password || (config.default_password as string),
        role: 'student',
      }

      // crete a user (transition-1)
      const newUser = await userModel.create([user], {session})

      if (!newUser.length) {
        throw new AppError(500, 'Fail to create user')
      }
      else{
        studentData.id = newUser[0].id
        studentData.user = newUser[0]._id

        console.log(studentData);

        // create a student (transition-2)
        const newStudent = await Student.create([studentData], {session})

        if(!newStudent){
          throw new AppError(500, 'Fail to create student')
        }

        await session.commitTransaction()
        await session.endSession()
        return newStudent
      }
    }
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
  }
}

export const userService = {
  createStudentIntoDB,
}

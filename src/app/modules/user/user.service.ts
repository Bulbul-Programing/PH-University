import config from '../../config'
import { academicSemesterModel } from '../academicSemester/academic.semester.model'
import { TStudents } from '../students/student.interface'
import { Student } from '../students/student.model'
import { TNewUser } from './user.interface'
import { userModel } from './user.model'
import { generateId } from './user.utils'

const createStudentIntoDB = async (
  password: string,
  studentData: TStudents,
) => {

  const academicSemester = await academicSemesterModel.findById(
    studentData.admissionSemester,
  )

  if (academicSemester) {
    const userId : string =await generateId(academicSemester)

    const user: TNewUser = {
      id: userId,
      password: password || (config.default_password as string),
      role: 'student',
    }
    const newUser = await userModel.create(user)
    if (Object.keys(newUser).length) {
      studentData.id = newUser.id
      studentData.user = newUser._id
      const newStudent = await Student.create(studentData)
      return newStudent
    }
  }
}

export const userService = {
  createStudentIntoDB,
}

import config from '../../config'
import { TStudents } from '../students/student.interface'
import { Student } from '../students/student.model'
import { TNewUser } from './user.interface'
import { userModel } from './user.model'

const createStudentIntoDB = async (
  password: string,
  studentData: TStudents,
) => {

  const user: TNewUser = {
    id : '2030100001',
    password: password || (config.default_password as string),
    role: 'student',
  }

  const newUser = await userModel.create(user)
  
  if(Object.keys(newUser).length){
    studentData.id = newUser.id
    studentData.user = newUser._id

    const newStudent = await Student.create(studentData)
    return newStudent
  }
}

export const userService = {
  createStudentIntoDB,
}

import { error } from 'console'
import { TStudents } from './student.interface'
import { Student } from './student.model'



const getAllStudentsFromDB = async () => {
  const result = await Student.find()
  return result
}

const getSingleStudentDataFromDB = async (id: string) => {
  const result = await Student.findOne({ id: id })
  return result
}

export const studentService = {
  getAllStudentsFromDB,
  getSingleStudentDataFromDB,
}

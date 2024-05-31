import { TAcademicFaculty } from './academicFaculty.interface'
import { academicFacultyModel } from './academicFaculty.model'

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
  const result = await academicFacultyModel.create(payload)
  return result
}

const getAllAcademicFacultyIntoDb = async () => {
  const result = await academicFacultyModel.find()
  return result
}

const getSingleAcademicFacultyIntoDb = async (id: string) => {
  const result = await academicFacultyModel.findById({ _id: id })
  return result
}

const updateAcademicFacultyIntoDb = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await academicFacultyModel.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  )
  return result
}

export const academicFacultyService = {
  createAcademicFacultyIntoDb,
  getAllAcademicFacultyIntoDb,
  getSingleAcademicFacultyIntoDb,
  updateAcademicFacultyIntoDb,
}

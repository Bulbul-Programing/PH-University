import { TAcademicSemester } from "./academic.semester.interface"
import { academicSemesterModel } from "./academic.semester.model"


const createAcademicSemesterIntoDb = async(semesterData : TAcademicSemester) =>{
    const result = await academicSemesterModel.create(semesterData)
    return result
}

export const AcademicSemesterService = {
    createAcademicSemesterIntoDb
}
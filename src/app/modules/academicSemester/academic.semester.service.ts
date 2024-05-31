import { Error } from "mongoose"
import { TAcademicSemester } from "./academic.semester.interface"
import { academicSemesterModel } from "./academic.semester.model"
import { academicSemesterCodeAndNameValidation } from "./academic.semester.constant"


const createAcademicSemesterIntoDb = async(semesterData : TAcademicSemester) =>{

    if(academicSemesterCodeAndNameValidation[semesterData.name] !== semesterData.code ){
        throw new Error('Invalid semester code.')
    }
    const result = await academicSemesterModel.create(semesterData)
    return result
}

export const AcademicSemesterService = {
    createAcademicSemesterIntoDb
}
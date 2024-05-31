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

const allAcademicSemesterIntoDb = async()=> {
    const result = await academicSemesterModel.find()
    return result
}

const singleAcademicSemesterIntoDb = async (id : string) => {
    const result = await academicSemesterModel.findOne({_id : id})
    return result
}

export const AcademicSemesterService = {
    createAcademicSemesterIntoDb,
    allAcademicSemesterIntoDb,
    singleAcademicSemesterIntoDb
}
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentModel } from "./academicDepartment.model";


const createAcademicDepartmentIntoDb = async(payload : TAcademicDepartment) => {
    const result = await AcademicDepartmentModel.create(payload)
    return result
}

const getAllAcademicDepartmentIntoDb = async () => {
    const result = await AcademicDepartmentModel.find().populate('academicFaculty')
    return result
}

const getSingleAcademicDepartmentIntoDb = async (id: string) => {
    const result = AcademicDepartmentModel.findById({_id : id})
    return result
}

const updateAcademicDepartmentIntoDb = async (id : string, payload : Partial<TAcademicDepartment>) => {
    const result = await AcademicDepartmentModel.findOneAndUpdate({_id : id}, payload, {new : true})
    return result
}

export const academicDepartmentService = {
    createAcademicDepartmentIntoDb,
    getAllAcademicDepartmentIntoDb,
    getSingleAcademicDepartmentIntoDb,
    updateAcademicDepartmentIntoDb
}
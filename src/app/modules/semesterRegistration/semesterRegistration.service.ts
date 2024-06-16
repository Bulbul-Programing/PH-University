import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/AppError";
import { academicSemesterModel } from "../academicSemester/academic.semester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationModel } from "./semesterRegistration.model";


const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {

    // checking academic semester is exist.

    const academicSemesterIsExist = await academicSemesterModel.findById(payload.academicSemester)

    if (!academicSemesterIsExist) {
        throw new AppError(400, 'academic semester not found')
    }

    // check if the semester is already registered!

    const semesterRegistrationIsExist = await SemesterRegistrationModel.findOne({ academicSemester: payload.academicSemester })

    if (semesterRegistrationIsExist) {
        throw new AppError(400, 'This semester is already registered!')
    }

    const result = await SemesterRegistrationModel.create(payload);
    return result;
}

const getAllSemesterRegistrationIntoDB = async (query: Record<string, unknown>) => {
    const semesterRegistrationQuery = new QueryBuilder(SemesterRegistrationModel.find().populate('academicSemester'), query).filter().sort().paginate().fields()

    const result = await semesterRegistrationQuery.modelQuery
    return result
}

const getSingleRegistrationIntoDB = async (id: string) => {
    const result = SemesterRegistrationModel.findById(id).populate('academicSemester')
    return result 
}


export const semesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationIntoDB,
    getSingleRegistrationIntoDB

}
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/AppError";
import { academicSemesterModel } from "../academicSemester/academic.semester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationModel } from "./semesterRegistration.model";


const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {

    // check if there any registered semester that is already 'upcoming|ongoing'.

    const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistrationModel.findOne({
        $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }]
    })

    if (isThereAnyUpcomingOrOngoingSemester) {
        throw new AppError(400, `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} register semester`)
    }

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

const updateSemesterRegisterIntoDB = async (id: string, payload: Partial<TSemesterRegistration>) => {
    // checking semester exist
    const isSemesterRegisterExists = await SemesterRegistrationModel.findById(id)

    if (!isSemesterRegisterExists) {
        throw new AppError(400, 'This semester is not found!')
    }

    const currantSemesterStatus = isSemesterRegisterExists?.status
    const requestStatus = payload.status
    if (currantSemesterStatus === 'ENDED') {
        throw new AppError(500, `this semester already ${currantSemesterStatus}`)
    }

    if(currantSemesterStatus === 'UPCOMING' && requestStatus === 'ENDED'){
        throw new AppError(500, `You can not directly change status from ${currantSemesterStatus} to ${requestStatus}`)
    }

    if(currantSemesterStatus === 'ONGOING' && requestStatus === 'UPCOMING'){
        throw new AppError(500, `You can not directly change status from ${currantSemesterStatus} to ${requestStatus}`)
    }

    const result = await SemesterRegistrationModel.findByIdAndUpdate(id, payload, {new : true, runValidators : true})
    
    return result
}


export const semesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationIntoDB,
    getSingleRegistrationIntoDB,
    updateSemesterRegisterIntoDB
}
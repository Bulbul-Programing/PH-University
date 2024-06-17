import { TOfferedCourse } from "./OfferedCourse.interface";
import { OfferedCourseModel } from "./OfferedCourse.model";


const createOfferedCourseIntoDB = async (payload : TOfferedCourse) => {
    const result = await OfferedCourseModel.create(payload)
    return result
}



export const offerCourseService = {
    createOfferedCourseIntoDB
}
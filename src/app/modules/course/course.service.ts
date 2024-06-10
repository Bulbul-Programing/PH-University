import { TCourse } from "./course.interface";
import { courseModel } from "./course.model";

const cerateCourseIntoDB = async(payload : TCourse) => {
    const result = await courseModel.create(payload)
    return result
}

const getAllCourseIntoDB = async()=>{
    const result = await courseModel.find()
    return result
}

const getSingleCourseIntoDB = async (id : string) => {
    const result = await courseModel.findById(id)
    return result
}

const deleteCourseIntoDB = async (id: string) => {
    const result = await courseModel.findByIdAndUpdate(id , {isDeleted : true}, {new : true})
    return result
}

export const courseService = {
    cerateCourseIntoDB,
    getAllCourseIntoDB,
    getSingleCourseIntoDB,
    deleteCourseIntoDB
}
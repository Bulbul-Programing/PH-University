import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchAbleFields } from "./course.const";
import { TCourse } from "./course.interface";
import { courseModel } from "./course.model";

const cerateCourseIntoDB = async(payload : TCourse) => {
    const result = await courseModel.create(payload)
    return result
}

const getAllCourseIntoDB = async(query: Record<string, unknown>)=>{

    const courseQuery = new QueryBuilder(courseModel.find()
    .populate('preRequisiteCourse.course')
    , query)
    .searching(courseSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields()

    const result = await courseQuery.modelQuery
    return result
}

const getSingleCourseIntoDB = async (id : string) => {
    const result = await courseModel.findById(id).populate('preRequisiteCourse.course')
    return result
}

const deleteCourseIntoDB = async (id: string) => {
    const result = await courseModel.findByIdAndUpdate(id , {isDeleted : true}, {new : true})
    return result
}

const updateCourseIntoDB = async (id: string, payload : TCourse) => {

    const {preRequisiteCourse, ...BasicCourseInfo} = payload

    // const updateRemainingCourse = await courseModel.findByIdAndUpdate(id, BasicCourseInfo, {new : true, runValidators : true})

    if(preRequisiteCourse && preRequisiteCourse.length > 0){
        const deletedPreRequisite = preRequisiteCourse.filter(el => el.course && el.isDeleted).map(el => el.course)
        console.log(deletedPreRequisite);
        const deletedPreRequisiteCourse = await courseModel.findByIdAndUpdate(id,{
            $pull : {preRequisiteCourse : {course : {$in : deletedPreRequisite}}}
        })
    }
}

export const courseService = {
    cerateCourseIntoDB,
    getAllCourseIntoDB,
    getSingleCourseIntoDB,
    deleteCourseIntoDB,
    updateCourseIntoDB
}
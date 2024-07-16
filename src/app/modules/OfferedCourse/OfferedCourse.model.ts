import { Schema, model } from "mongoose";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { Days } from "./OfferedCourse.const";


const offerCourseSchema = new Schema<TOfferedCourse>({
    semesterRegistration: { type: Schema.Types.ObjectId, required: true, ref: 'SemesterRegistration' },
    academicFaculty: { type: Schema.Types.ObjectId, required: true, ref: 'academicFaculty' },
    academicSemester: { type: Schema.Types.ObjectId, required: true, ref: 'academicSemester' },
    academicDepartment: { type: Schema.Types.ObjectId, required: true, ref: 'academicFaculty' },
    course: { type: Schema.Types.ObjectId, required: true, ref: 'courseFaculty' },
    faculty: { type: Schema.Types.ObjectId, required: true, ref: 'faculty' },
    maxCapacity: { type: Number, required: true, default : 10 },
    section: { type: Number, required: true },
    days: [{type: String, required: true , enum : Days}],
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
},{
    timestamps : true
})

export const OfferedCourseModel = model<TOfferedCourse>('offeredCourse', offerCourseSchema)
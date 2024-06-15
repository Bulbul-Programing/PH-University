import { Schema, model } from 'mongoose'
import { TCourse, TCourseFaculty, TPreRequisiteCourse } from './course.interface'

const preRequisiteCourseSchema = new Schema<TPreRequisiteCourse>({
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  isDeleted: { type: Boolean, default: false },
},{ _id: false })

const courseSchema = new Schema<TCourse>({
  title: { type: String, required: true, unique: true, trim: true },
  prefix: { type: String, required: true, trim: true },
  code: { type: Number, required: true, trim: true },
  credit: { type: Number, required: true, trim: true },
  isDeleted: { type: Boolean, default: false },
  preRequisiteCourse: [preRequisiteCourseSchema],
})

export const courseModel = model<TCourse>('Course', courseSchema)

const courseFacultySchema = new Schema<TCourseFaculty>({
  course : {type : Schema.Types.ObjectId, ref : 'Course', unique : true},
  faculties : [{
    type : Schema.Types.ObjectId, ref : 'academicFaculty'
  }]
})

export const CourseFacultyModel = model<TCourseFaculty>('courseFaculty', courseFacultySchema)
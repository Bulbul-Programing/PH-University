import { Schema, model } from 'mongoose'
import { TCourse, TPreRequisiteCourse } from './course.interface'

const preRequisiteCourseSchema = new Schema<TPreRequisiteCourse>({
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  isDeleted: { type: Boolean, default: false },
})

const courseSchema = new Schema<TCourse>({
  title: { type: String, required: true, unique: true, trim: true },
  prefix: { type: String, required: true, trim: true },
  code: { type: Number, required: true, trim: true },
  credit: { type: Number, required: true, trim: true },
  isDeleted: { type: Boolean, default: false },
  preRequisiteCourse: [preRequisiteCourseSchema],
})

export const courseModel = model<TCourse>('Course', courseSchema)

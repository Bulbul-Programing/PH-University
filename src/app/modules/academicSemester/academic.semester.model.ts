import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './academic.semester.interface'
import { academicSemesterCode, academicSemesterMonth, academicSemesterName } from './academic.semester.constant'
import { string } from 'zod'

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: { type: String, enum: academicSemesterName, required: true },
  code: { type: String, enum: academicSemesterCode, required : true },
  year : {type : String, required : true},
  startMonth : {type : String, enum : academicSemesterMonth, required: true},
  endMonth : {type : String, enum : academicSemesterMonth, required: true}
})

export const academicSemesterModel = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)

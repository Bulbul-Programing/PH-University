import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './academic.semester.interface'
import { academicSemesterCode, academicSemesterMonth, academicSemesterName } from './academic.semester.constant'
import AppError from '../../error/AppError'

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: { type: String, enum: academicSemesterName, required: true },
  code: { type: String, enum: academicSemesterCode, required : true },
  year : {type : String, required : true},
  startMonth : {type : String, enum : academicSemesterMonth, required: true},
  endMonth : {type : String, enum : academicSemesterMonth, required: true}
})

academicSemesterSchema.pre('save', async function(next){
  const isExistSemester = await academicSemesterModel.findOne({
    year : this.year,
    name : this.name
  })
  if(isExistSemester){
    throw new AppError(500,'Semester is already created!')
  }
  else{
    next()
  }
})


export const academicSemesterModel = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)

import { Schema, model } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'
import AppError from '../../error/AppError'

export const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'academicFaculty',
    },
  },
  {
    timestamps: true,
  },
)

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartmentModel.findOne({
    name: this.name,
  })

  if (isDepartmentExist) {
    throw new AppError( 404,'Department is already exist!')
  }

  next()
})

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()

  const isDepartmentExist = await AcademicDepartmentModel.findOne(query)
  if (!isDepartmentExist) {
    throw new AppError(404,'Department dose not found')
  }
  next()
})

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  'academicDepartment',
  academicDepartmentSchema,
)

import { string, z } from 'zod'
import {
  academicSemesterCode,
  academicSemesterMonth,
  academicSemesterName,
} from './academic.semester.constant'
import { TSemesterName } from './academic.semester.interface'

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemesterName] as [string, ...string[]]),
    code: z.enum([...academicSemesterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...academicSemesterMonth] as [string, ...string[]]),
    endMonth: z.enum([...academicSemesterMonth] as [string, ...string[]]),
  }),
})

export const academicSemesterValidations = {
  createAcademicSemesterValidationSchema,
}

import { z } from 'zod'

const academicFacultyValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    }),
  }),
})
export const updateAcademicFacultyValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    }).optional(),
  }),
})

export const AcademicFacultyValidation = {
    academicFacultyValidation,
    updateAcademicFacultyValidation
}
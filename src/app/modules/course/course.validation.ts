import { z } from 'zod'

const preRequisiteCourseSchema = z.object({
  title: z.string(),
  isDeleted: z.string().optional()
})

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credit: z.number(),
    isDeleted: z.array(preRequisiteCourseSchema).optional()
  }),
})

const updatePreRequisiteCourseSchema = z.object({
  title: z.string(),
  isDeleted: z.string()
})

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credit: z.number().optional(),
    isDeleted: z.array(updatePreRequisiteCourseSchema).optional()
  }),
})

const assignCourseFacultyValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string())
  })
})
const removeCourseFacultyValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()).optional()
  })
})

export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  assignCourseFacultyValidationSchema,
  removeCourseFacultyValidationSchema
}
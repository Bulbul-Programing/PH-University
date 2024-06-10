import { z } from 'zod'

const preRequisiteCourseSchema = z.object({
    title : z.string(),
    isDeleted : z.string().optional()
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

export const CourseValidation = {
    createCourseValidationSchema
}
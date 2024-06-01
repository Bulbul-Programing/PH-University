import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
    body : z.object({
        name : z.string({
            required_error: 'name is required',
            invalid_type_error: 'name must be a string',
          }),
        academicFaculty : z.string({
            required_error: 'academic Faculty is required',
            invalid_type_error: 'academic Faculty must be a string',
          }) 
    })
})

const updateAcademicDepartmentValidationSchema = z.object({
    body : z.object({
        name : z.string({
            required_error: 'name is required',
            invalid_type_error: 'name must be a string',
          }).optional(),
        academicFaculty : z.string({
            required_error: 'academic Faculty is required',
            invalid_type_error: 'academic Faculty must be a string',
          }).optional() 
    })
})

export const academicDepartmentValidation = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema
}
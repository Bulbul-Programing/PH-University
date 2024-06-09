import { z } from 'zod'

// Define Zod schema for TFacultyUserName
const createFacultyUserNameSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
})

// Define Zod schema for TFaculty
const createFacultySchema = z.object({
  body: z.object({
    faculty: z.object({
      name: createFacultyUserNameSchema,
      role: z.string(),
      designation: z.string(),
      gender: z.enum(['male', 'female', 'other']),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      dateOfBirth: z.string(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImage: z.string(),
      academicDepartment: z.string(),
      academicFaculty: z.string(),
      isDeleted: z.boolean().default(false),
    }),
  }),
})

const updateFacultyUserNameSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
})

// Define Zod schema for TFaculty
const updateFacultySchema = z.object({
  body: z.object({
    faculty: z.object({
      name: updateFacultyUserNameSchema,
      role: z.string().optional(),
      designation: z.string().optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImage: z.string().optional(),
      academicDepartment: z.string().optional(),
      academicFaculty: z.string().optional(),
      isDeleted: z.boolean().default(false).optional(),
    }),
  }),
})

// Export the schema
export const FacultyValidationSchema = {
  createFacultySchema,
  updateFacultySchema
}

import { z } from 'zod'
import { Types } from 'mongoose'

// Define Zod schema for TFacultyUserName
const FacultyUserNameSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
})

// Define Zod schema for TFaculty
const FacultySchema = z.object({
  body: z.object({
    faculty: z.object({
      name: FacultyUserNameSchema,
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

// Export the schema
export const FacultyValidationSchema = FacultySchema

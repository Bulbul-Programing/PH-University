import { z } from 'zod'

// Define the Zod schema for TStudentName
const createStudentNameSchema = z.object({
  firstName: z.string({
    required_error: 'First name is required',
    invalid_type_error: 'First name must be a string',
  }),
  middleName: z.string().optional(),
  lastName: z.string({
    required_error: 'Last name is required',
    invalid_type_error: 'Last name must be a string',
  }),
})

// Define the Zod schema for TGuardian
const createGuardianSchema = z.object({
  fatherName: z.string({
    required_error: "Father's name is required",
    invalid_type_error: "Father's name must be a string",
  }),
  fatherOccupation: z.string({
    required_error: "Father's occupation is required",
    invalid_type_error: "Father's occupation must be a string",
  }),
  fatherContactNo: z.string({
    required_error: "Father's contact number is required",
    invalid_type_error: "Father's contact number must be a string",
  }),
  motherName: z.string({
    required_error: "Mother's name is required",
    invalid_type_error: "Mother's name must be a string",
  }),
  motherOccupation: z.string({
    required_error: "Mother's occupation is required",
    invalid_type_error: "Mother's occupation must be a string",
  }),
  motherContactNo: z.string({
    required_error: "Mother's contact number is required",
    invalid_type_error: "Mother's contact number must be a string",
  }),
})

// Define the Zod schema for TLocalGuardian
const createLocalGuardianSchema = z.object({
  name: z.string({
    required_error: "Local guardian's name is required",
    invalid_type_error: "Local guardian's name must be a string",
  }),
  occupation: z.string({
    required_error: "Local guardian's occupation is required",
    invalid_type_error: "Local guardian's occupation must be a string",
  }),
  contactNo: z.string({
    required_error: "Local guardian's contact number is required",
    invalid_type_error: "Local guardian's contact number must be a string",
  }),
  address: z.string({
    required_error: "Local guardian's address is required",
    invalid_type_error: "Local guardian's address must be a string",
  }),
})

// Define the Zod schema for TStudents
const createStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: createStudentNameSchema,
      gender: z.enum(['male', 'female'], {
        required_error: 'Gender is required',
        invalid_type_error: "Gender must be either 'male' or 'female'",
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string({
          required_error: 'Email is required',
          invalid_type_error: 'Email must be a string',
        })
        .email('Invalid email format'),
      contactNo: z.string({
        required_error: 'Contact number is required',
        invalid_type_error: 'Contact number must be a string',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
        invalid_type_error: 'Emergency contact number must be a string',
      }),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], {
        required_error: 'Blood group is required',
        invalid_type_error: 'Invalid blood group',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
        invalid_type_error: 'Present address must be a string',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
        invalid_type_error: 'Permanent address must be a string',
      }),
      profileImage: z.string({
        required_error: 'Profile image is required',
        invalid_type_error: 'Profile image must be a string',
      }),
      guardian: createGuardianSchema,
      localGuardian: createLocalGuardianSchema,
      admissionSemester: z.string(),
    }),
  }),
})

// update schema

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidation = {
  createStudentValidationSchema,
  updateStudentValidationSchema
} 

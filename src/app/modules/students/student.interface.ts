import { Schema, model, connect, Model, ObjectId, Types } from 'mongoose'

export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TStudentName = {
  firstName: string
  middleName: string
  lastName: string
}

export type TStudents = {
  id: string
  name: TStudentName
  user : Types.ObjectId,
  gender: 'male' | 'female'
  dateOfBirth?: string
  email: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImage?: string
  admissionSemester : Types.ObjectId
  academicFaculty : Types.ObjectId
  academicDepartment : Types.ObjectId
}

// builtin static method.

export interface studentModel extends Model<TStudents>{
  isUserExist(id : string) : Promise<TStudents | null>
}

 //builtin instance method.

// export type studentMethod = {
//   isUserExist(id: string): Promise<TStudents | null>
// }

// export type studentModel = Model<
//   TStudents,
//   Record<string, never>,
//   studentMethod
// >

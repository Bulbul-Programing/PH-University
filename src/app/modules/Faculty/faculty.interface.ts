import { Types } from 'mongoose'

export type TGender = 'male' | 'female' | 'other'
export type TBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
export type TFacultyUserName = {
    firstName : string,
    middleName ?: string,
    lastName : string
}
export type TFaculty = {
  id : string,
  name: TFacultyUserName
  user : Types.ObjectId,
  role: string
  designation: string
  gender: TGender
  bloodGroup : TBloodGroup
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  profileImage: string
  academicDepartment: Types.ObjectId
  academicFaculty: Types.ObjectId
  isDeleted: boolean
}

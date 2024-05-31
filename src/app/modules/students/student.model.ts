import { Schema, model } from 'mongoose'
import {
  TGuardian,
  TLocalGuardian,
  TStudents,
  TStudentName,
  studentModel,
} from './student.interface'
import { string } from 'zod'

  
const studentNameSchema = new Schema<TStudentName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
}, {_id : false})

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
}, {_id : false})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
}, {_id : false})

const studentSchema = new Schema<TStudents, studentModel>({
  id : {type :String, required : false, unique : true,},
  name: {
    type: studentNameSchema,
    required: true,
  },
  user : {type: Schema.ObjectId, },
  gender: { type: String, enum: ['male', 'female'], required: true },
  dateOfBirth: { type: String },
  email: { type: String, required: true,unique:true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    required: true,
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  profileImage: {type : String, required : true},
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  admissionSemester : {type : String},
})

// builtin static method.

  // studentSchema.statics.isUserExist = async function(id : string) {
  //    const existsUser = await Student.findOne({id : id})
  //    return existsUser
  // }

 //builtin instance method.

// studentSchema.methods.isUserExist = async function (id: string) {
//   const existsUser = await Student.findOne({ id: id })
//   return existsUser
// }

studentSchema.virtual('fullName').get(function(){
  return this.name.firstName + this.name.middleName + this.name.firstName
})



export const Student = model<TStudents, studentModel>('student', studentSchema)

import { Schema, model } from 'mongoose';
import { TFacultyInterface } from './faculty.interface';

const FacultyUserNameSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true }
},{ _id: false });

const FacultySchema = new Schema<TFacultyInterface>({
  id : {type : String, unique : true},
  name: { type: FacultyUserNameSchema, required: true },
  user : {type : Schema.Types.ObjectId},
  role: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], required: true },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true, unique : true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  profileImage: { type: String, required: true },
  academicDepartment: { type: Schema.Types.ObjectId, ref: 'AcademicDepartment', required: true },
  academicFaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty', required: true },
  isDeleted: { type: Boolean, default: false }
});

export const FacultyModel = model<TFacultyInterface>('faculty', FacultySchema)
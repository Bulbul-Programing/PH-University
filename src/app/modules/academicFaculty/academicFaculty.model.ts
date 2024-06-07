import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

export const academicFacultySchema = new Schema<TAcademicFaculty>({
    name: { type: String, required: true, unique: true }
},{
    timestamps : true
})
export const academicFacultyUpdateSchema = new Schema<TAcademicFaculty>({
    name : {type : String, required : true}
},{
    timestamps : true
})


export const academicFacultyModel = model<TAcademicFaculty>('academicFaculty', academicFacultySchema)
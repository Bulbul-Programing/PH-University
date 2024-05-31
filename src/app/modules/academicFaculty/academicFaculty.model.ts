import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new Schema<TAcademicFaculty>({
    name : {type : String, required : true}
},{
    timestamps : true
})
const academicFacultyUpdateSchema = new Schema<TAcademicFaculty>({
    name : {type : String, required : true}
},{
    timestamps : true
})


export const academicFacultyModel = model<TAcademicFaculty>('academicFaculty', academicFacultySchema)
import { Request } from "express";
import { FacultyModel } from "./faculty.model";
import { TFacultyInterface } from "./Faculty.interface";
import { object } from "zod";


const getAllFacultyIntoDB = async() => {
    const result = await FacultyModel.find()
    return result
}

const getSingleFacultyIntoDB = async(id : string)=>{
    const result = await FacultyModel.findOne({id})
    return result
}

const updateFacultyIntoDB = async(id : string, payload : Partial<TFacultyInterface>)=>{
   const {name, ...remainingFacultyData} = payload
   const modifiedUpdateData : Record<string, unknown> = {
    ...remainingFacultyData
   }

   if(name && Object.keys(name).length){
    for(const [key, value] of Object.entries(name)){
        modifiedUpdateData[`name.${key}`] = value
    }
   }
   
    const result = await FacultyModel.findOneAndUpdate({id : id}, modifiedUpdateData, {new : true})

    return result
}

const deleteFacultyIntoDb = async(id: string) => {
    const result = await FacultyModel.findOneAndUpdate({id : id}, {isDeleted : true}, {new : true})
    return result
}

export const FacultyService = {
    getAllFacultyIntoDB,
    getSingleFacultyIntoDB,
    updateFacultyIntoDB,
    deleteFacultyIntoDb
}
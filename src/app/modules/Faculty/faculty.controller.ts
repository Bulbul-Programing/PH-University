import { Request, Response } from "express";
import { FacultyService } from "./faculty.service";
import AppError from "../../error/AppError";


const getAllFaculty = async(req : Request, res : Response) => {
    const result = await FacultyService.getAllFacultyIntoDB()

    if(!result){
        throw new AppError(404, 'Faculty not Found')
    }
    res.status(200).json({
        success : true,
        massage : 'All faculty data fetch successfully',
        data : result
    })
}

const getSingleFaculty = async(req :Request, res: Response) => {
    const facultyId = req.params.facultyId
    const result = await FacultyService.getSingleFacultyIntoDB(facultyId)
    
    if(!result){
        throw new AppError(404, 'Faculty not Found')
    }
    res.status(200).json({
        success : true,
        massage : 'Faculty data fetch successfully',
        data : result
    })
}

const updateFaculty = async(req : Request, res: Response) => {
    const facultyId = req.params.facultyId
    const {faculty} = req.body

    const result = await FacultyService.updateFacultyIntoDB(facultyId, faculty)
    
    if(!result){
        throw new AppError(404, 'Faculty not Found')
    }
    res.status(200).json({
        success : true,
        massage : 'Faculty data update successfully',
        data : result
    })
}

const deleteFaculty = async (req : Request, res : Response) => {
    const facultyId = req.params.facultyId
    const result = await FacultyService.deleteFacultyIntoDb(facultyId)
    
    if(!result){
        throw new AppError(404, 'Faculty not Found')
    }
    res.status(200).json({
        success : true,
        massage : 'Faculty delete successfully',
        data : result
    })
}

export const FacultyController = {
    getAllFaculty,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty
}
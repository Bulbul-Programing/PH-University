import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterService } from "./academic.semester.service";


const createAcademicSemester = catchAsync(async(req : Request, res : Response)=>{
    const semesterData = req.body
    const result = await AcademicSemesterService.createAcademicSemesterIntoDb(semesterData)

    res.status(200).json({
        success : true,
        message : 'Academic semester create successfully',
        data : result
    })
})

export const AcademicSemesterController = {
    createAcademicSemester
}
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { semesterRegistrationService } from "./semesterRegistration.service";


const createSemesterRegistration = catchAsync(async (req: Request, res: Response) => {

    const result = await semesterRegistrationService.createSemesterRegistrationIntoDB(req.body)

    res.status(200).json({
        success: true,
        massage: 'semester registration successfully',
        data: result
    })
})

const getAllSemesterRegistration = catchAsync(async (req: Request, res: Response) => {

    const result = await semesterRegistrationService.getAllSemesterRegistrationIntoDB(req.query)

    res.status(200).json({
        success: true,
        massage: 'All semester retrieve successfully',
        data: result
    })
})

const singleSemesterRegistration = catchAsync(async (req: Request, res: Response) => {

    const result = await semesterRegistrationService.getSingleRegistrationIntoDB(req.params.semesterID)

    res.status(200).json({
        success: true,
        massage: 'All semester retrieve successfully',
        data: result
    })
})

const updateSemesterRegister = catchAsync(async (req: Request, res: Response) => {
    const {semesterID} = req.params
    const updateData = req.body
    const result = await semesterRegistrationService.updateSemesterRegisterIntoDB(semesterID, updateData)

    res.status(200).json({
        success: true,
        massage: 'semester update successfully',
        data: result
    })

})

export const semesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    singleSemesterRegistration,
    updateSemesterRegister
}
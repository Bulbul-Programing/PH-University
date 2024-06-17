import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { offerCourseService } from "./OfferedCourse.service";


const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await offerCourseService.createOfferedCourseIntoDB(req.body)

    res.status(200).json({
        success: true,
        massage: 'Offered course created successfully',
        data: result
    })
})




export const offerCourseController = {
    createOfferedCourse
}
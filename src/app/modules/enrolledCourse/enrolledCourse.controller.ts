import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { enrolledCourseService } from "./enrolledCourse.service";



const enrolledCourse = catchAsync(async(req:Request, res : Response)=>{
    const user = req.user
    const payload = req.body
    const result = await enrolledCourseService.enrolledCourseIntoDb(user, payload)
    
    res.status(200).json({
        success : true,
        massage : 'course enrolled successfully',
        data : result
    })
})

export const enrolledCourseController = {
    enrolledCourse
}
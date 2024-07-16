import { JwtPayload } from "jsonwebtoken"
import { TEnrolledCourse } from "./enrolledCourse.interface"
import { OfferedCourseModel } from "../OfferedCourse/OfferedCourse.model"
import AppError from "../../error/AppError"
import { Student } from "../students/student.model"
import enrolledCourseModel from "./enrolledCourse.model"
import mongoose from "mongoose"


const enrolledCourseIntoDb = async (user : JwtPayload , payload : TEnrolledCourse) =>{
    const {offeredCourse} = payload

    const isOfferedCourseExist = await OfferedCourseModel.findOne({_id : offeredCourse})
    if(!isOfferedCourseExist){
        throw new AppError(404, 'Offered course not found!')
    }

    if(isOfferedCourseExist.maxCapacity <= 0){
        throw new AppError(400, 'Room is full')
    }

    const student = await Student.findOne({id : user.userId}, {_id : 1})
    if(!student){
        throw new AppError(404, 'user not found!')
    }

    const isAlreadyEnrolled = await enrolledCourseModel.findOne({
        semesterRegistration : isOfferedCourseExist.semesterRegistration,
        offeredCourse,
        student : student._id
    })

    if(isAlreadyEnrolled){
        throw new AppError(400, 'user already enrolled')
    }

    const session = await mongoose.startSession();

    try {
      session.startTransaction();
  
      const result = await enrolledCourseModel.create(
        [
          {
            semesterRegistration: isOfferedCourseExist.semesterRegistration,
            academicSemester: isOfferedCourseExist.academicSemester,
            academicFaculty: isOfferedCourseExist.academicFaculty,
            academicDepartment: isOfferedCourseExist.academicDepartment,
            offeredCourse: offeredCourse,
            course: isOfferedCourseExist.course,
            student: student._id,
            faculty: isOfferedCourseExist.faculty,
            isEnrolled: true,
          },
        ],
        { session },
      );
  
      if (!result) {
        throw new AppError(
          400,
          'Failed to enroll in this course !',
        );
      }
  
      const maxCapacity = isOfferedCourseExist.maxCapacity;
      await OfferedCourseModel.findByIdAndUpdate(offeredCourse, {
        maxCapacity: maxCapacity - 1,
      });
  
      await session.commitTransaction();
      await session.endSession();
  
      return result;
    } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
    }

}

export const enrolledCourseService = {
    enrolledCourseIntoDb
}
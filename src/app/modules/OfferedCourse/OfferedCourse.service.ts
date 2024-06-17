import AppError from "../../error/AppError";
import { FacultyModel } from "../Faculty/faculty.model";
import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { academicFacultyModel } from "../academicFaculty/academicFaculty.model";
import { courseModel } from "../course/course.model";
import { SemesterRegistrationModel } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { OfferedCourseModel } from "./OfferedCourse.model";


const createOfferedCourseIntoDB = async (payload : TOfferedCourse) => {
    const {semesterRegistration, academicFaculty, academicDepartment, course, faculty, section} = payload
    
    // checking semester registration is exist
    const isSemesterRegistrationExist = await SemesterRegistrationModel.findById(semesterRegistration)
    if(!isSemesterRegistrationExist){
        throw new AppError(404, 'Semester Registration not Found!')
    }
    
    // checking academic Faculty is exist
    const isAcademicFacultyExist = await academicFacultyModel.findById(academicFaculty)
    if(!isAcademicFacultyExist){
        throw new AppError(404, 'academic Faculty not Found!')
    }
    
    // checking academic department is exist
    const isAcademicDepartmentExist = await AcademicDepartmentModel.findById(academicDepartment)
    if(!isAcademicDepartmentExist){
        throw new AppError(404, 'academic department not Found!')
    }
    
    // checking academic course is exist
    const isCourseExist = await courseModel.findById(course)
    if(!isCourseExist){
        throw new AppError(404, 'course not Found!')
    }
    
    // checking academic faculty is exist
    const isFacultyExist = await FacultyModel.findById(faculty)
    if(!isFacultyExist){
        throw new AppError(404, 'faculty not Found!')
    }

    const academicSemester = isSemesterRegistrationExist.academicSemester

    // check if the department is belong to the faculty
    const isDepartmentBelongToFaculty = await AcademicDepartmentModel.findOne({
        _id: academicDepartment,
        academicFaculty,
      });
    
      if (!isDepartmentBelongToFaculty) {
        throw new AppError(
          500,
          `This ${isAcademicDepartmentExist.name} is not  belong to this ${isAcademicFacultyExist.name}`,
        );
      }

      // checking same semester registration same course and same section is already exist.

      const isSameOfferedCourseExistWithSameRegisteredWithSameSection = await OfferedCourseModel.findOne({
        semesterRegistration,
        course,
        section
      })

      if(isSameOfferedCourseExistWithSameRegisteredWithSameSection){
        throw new AppError(500, 'offered course with same section is already exist!')
      }

    const result = await OfferedCourseModel.create({...payload, academicSemester})
    return result
}



export const offerCourseService = {
    createOfferedCourseIntoDB
}
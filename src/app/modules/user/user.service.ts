import mongoose from 'mongoose'
import config from '../../config'
import { academicSemesterModel } from '../academicSemester/academic.semester.model'
import { TStudents } from '../students/student.interface'
import { Student } from '../students/student.model'
import { TNewUser } from './user.interface'
import { userModel } from './user.model'
import { generateAdminId, generateFacultyId, generateId } from './user.utils'
import AppError from '../../error/AppError'
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model'
import { academicFacultyModel } from '../academicFaculty/academicFaculty.model'
import { FacultyModel } from '../Faculty/faculty.model'
import { TFacultyInterface } from '../Faculty/faculty.interface'
import { Admin } from '../Admin/admin.model'

const createStudentIntoDB = async (
  password: string,
  studentData: TStudents,
) => {
  const academicSemester = await academicSemesterModel.findById(
    studentData.admissionSemester,
  )
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    if (academicSemester) {
      const userId: string = await generateId(academicSemester)

      const user: TNewUser = {
        id: userId,
        password: password || (config.default_password as string),
        role: 'student',
      }

      // crete a user (transition-1)
      const newUser = await userModel.create([user], { session })

      if (!newUser.length) {
        throw new AppError(500, 'Fail to create user')
      } else {
        studentData.id = newUser[0].id
        studentData.user = newUser[0]._id
        // create a student (transition-2)
        const newStudent = await Student.create([studentData], { session })
        if (!newStudent) {
          throw new AppError(500, 'Fail to create student')
        }

        await session.commitTransaction()
        await session.endSession()
        return newStudent
      }
    }
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
  }
}

const createFacultyIntoDB = async (password: string, payload: TFacultyInterface) => {
  
  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment,
  )
  const academicFaculty = await academicFacultyModel.findById(
    payload.academicFaculty,
  )
  
  if (!academicDepartment) {
    throw new AppError(404,'Academic Department not found')
  }
  if (!academicFaculty) {
    throw new AppError(404,'Academic Department not found')
  }
  
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const userId: string = await generateFacultyId()
    const createNewUser: TNewUser = {
      id: userId,
      password: password || (config.default_password as string),
      role: 'faculty',
    }

    const newUser = await userModel.create([createNewUser], { session })
    
    if (!newUser.length) {
      throw new AppError(404, 'User created Failed')
    } else {
      payload.id = newUser[0].id
      payload.user = newUser[0]._id
      const createFaculty = await FacultyModel.create([payload], {session})
      if(!createFaculty){
        throw new AppError(500, 'Faculty create failed')
      }
      await session.commitTransaction()
      await session.endSession()
      return createFaculty
    }
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
  }
}

const createAdminIntoDB = async (password: string, payload: TFacultyInterface) => {
  // create a user object
  const userData: Partial<TNewUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session }); 

    //create a admin
    if (!newUser.length) {
      throw new AppError(500, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(500, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userService = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB
}

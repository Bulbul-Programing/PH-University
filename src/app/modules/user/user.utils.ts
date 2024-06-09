import { TAcademicSemester } from "../academicSemester/academic.semester.interface";
import { userModel } from "./user.model";


const findLastStudentId = async() => {
    const lastStudent = await userModel.findOne({role : 'student'},{id : 1, _id : 0}).sort({createdAt : -1}).lean()
    
    return lastStudent?.id ? lastStudent.id : undefined
}

export const generateId = async (payload : TAcademicSemester) => {
    
    let currentId = (0).toString().padStart(4, '0')

    const lastStudentId = await findLastStudentId()
    const lastStudentSemesterCode = lastStudentId?.substring(4,6)
    const lastStudentYear = lastStudentId?.substring(0,4)
    const currentSemesterCode = payload.code
    const currentYear = payload.year


    if(lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentYear){
        currentId = lastStudentId.substring(6)
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')
    incrementId = `${payload.year}${payload.code}${incrementId}`

    return incrementId
}

export const generateFacultyId = async()=>{
    const lastFaculty = await userModel.findOne({role : 'faculty'},{id: 1, _id : 0}).sort({createdAt : -1}).lean()

    if(lastFaculty){
        const facultyIdString = (lastFaculty.id).split('F')
        const facultyId = (Number(facultyIdString[1]) + 1).toString().padStart(4, '0')
        const facultyIdWithString = `F-${facultyId}`
        return facultyIdWithString
    }
    else{
        return 'F-0001'
    }
}

export const findLastAdminId = async () => {
    const lastAdmin = await userModel.findOne(
      {
        role: 'admin',
      },
      {
        id: 1,
        _id: 0,
      },
    )
      .sort({
        createdAt: -1,
      })
      .lean();
  
    return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
  };
  
  export const generateAdminId = async () => {
    let currentId = (0).toString();
    const lastAdminId = await findLastAdminId();
  
    if (lastAdminId) {
      currentId = lastAdminId.substring(2);
    }
  
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  
    incrementId = `A-${incrementId}`;
    return incrementId;
  };



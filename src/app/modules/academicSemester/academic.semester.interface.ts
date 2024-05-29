import { TMonth } from "./academic.semester.constant"


export type TSemesterName = 'Autumn' | 'Summer'| 'Fall'
export type TSemesterCode = '01' | '02' | '03'
export type TAcademicSemester = {
    name : TSemesterName,
    code : TSemesterCode,
    year : Date,
    startMonth : TMonth,
    endMonth : TMonth
}
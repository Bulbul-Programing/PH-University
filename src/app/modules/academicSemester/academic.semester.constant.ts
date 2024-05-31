import { TAcademicSemesterCodeAndNameValidation } from "./academic.semester.interface"

export const academicSemesterName: string[] = ['Autumn', 'Summer', 'Fall']
export type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'
export const academicSemesterCode: string[] = ['01', '02', '03']
export const academicSemesterMonth: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
export const academicSemesterCodeAndNameValidation: TAcademicSemesterCodeAndNameValidation =
  {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  }

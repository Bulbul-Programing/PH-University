import express from 'express';
import auth from '../../middleware/auth';
import { enrolledCourseController } from './enrolledCourse.controller';

const router = express.Router()

router.post('/create-enrolled-course', auth('student'), enrolledCourseController.enrolledCourse)


export const enrolledCourseRouter = router
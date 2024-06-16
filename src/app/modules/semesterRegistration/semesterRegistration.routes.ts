import express from 'express';
import validateRequest from '../../middleware/validateRequestData';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import { semesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router()

router.post('/create-semester-registration', validateRequest(SemesterRegistrationValidations.createSemesterRegistrationValidationSchema), semesterRegistrationController.createSemesterRegistration)
router.get('/', semesterRegistrationController.getAllSemesterRegistration)
router.get('/:semesterID', semesterRegistrationController.singleSemesterRegistration)
router.patch('/:semesterID', validateRequest(SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema), semesterRegistrationController.updateSemesterRegister)

export const semesterRegistrationRouter = router

import { Router } from 'express';
import { createMultipleStudents, createMultipleQuestions } from '../controllers';

export const uploadRouter = Router();

uploadRouter.post('/questions', createMultipleQuestions);
uploadRouter.post('/students', createMultipleStudents);
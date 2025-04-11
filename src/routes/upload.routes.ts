import { Router } from 'express';
import { createMultipleQuestions } from '../controllers';

export const uploadRouter = Router();

uploadRouter.post('/', createMultipleQuestions);

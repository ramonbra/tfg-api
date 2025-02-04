import { Router } from 'express';
import { createQuestion, deleteQuestion, getQuestions, updateQuestion } from '../controllers';

export const questionRouter = Router();

questionRouter.post('/', createQuestion);
questionRouter.get('/', getQuestions);
questionRouter.put('/', updateQuestion);
questionRouter.delete('/', deleteQuestion);

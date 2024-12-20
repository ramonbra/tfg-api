import { Router } from 'express';
import { createQuestion, deleteQuestion, getQuestions, updateQuestion } from '../controllers/question.controller';

const questionRouter = Router();

// Ruta para crear un profesor
questionRouter.post('/', createQuestion);

// Ruta para obtener todos los profesores
questionRouter.get('/', getQuestions);

// Ruta para actualizar un profesor
questionRouter.put('/', updateQuestion);

// Ruta para borrar un profesor
questionRouter.delete('/', deleteQuestion);

export default questionRouter;
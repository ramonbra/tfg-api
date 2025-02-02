import { Router } from 'express';
import { createTest, getTests, updateTest, deleteTest } from '../controllers/test.controller';

const testRouter = Router();

// Ruta para crear un profesor
testRouter.post('/', createTest);

// Ruta para obtener todos los profesores
testRouter.get('/', getTests);

// Ruta para actualizar un profesor
testRouter.put('/', updateTest);

// Ruta para borrar un profesor
testRouter.delete('/', deleteTest);

export default testRouter;
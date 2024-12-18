import { Router } from 'express';
import { createProfessor } from '../controllers/professor.controller.js';

const professorRouter = Router();
professorRouter.put('/', createProfessor);

export default professorRouter;
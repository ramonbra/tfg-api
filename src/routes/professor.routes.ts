import { Router } from 'express';
import { createProfessor, getProfessors, updateProfessor, deleteProfessor } from '../controllers';

export const professorRouter = Router();

professorRouter.post('/', createProfessor);
professorRouter.get('/', getProfessors);
professorRouter.put('/', updateProfessor);
professorRouter.delete('/', deleteProfessor);

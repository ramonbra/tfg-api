import { Router } from 'express';
import { createProfessor, getProfessors, updateProfessor, deleteProfessor } from '../controllers/professor.controller.js';

const professorRouter = Router();

// Ruta para crear un profesor
professorRouter.post('/', createProfessor);

// Ruta para obtener todos los profesores
professorRouter.get('/', getProfessors);

// Ruta para actualizar un profesor
professorRouter.put('/', updateProfessor);

// Ruta para borrar un profesor
professorRouter.delete('/', deleteProfessor);

export default professorRouter;
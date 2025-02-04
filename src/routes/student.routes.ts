import { Router } from 'express';
import { createStudent, getStudents, updateStudent, deleteStudent } from '../controllers';

export const studentRouter = Router();

studentRouter.post('/', createStudent);
studentRouter.get('/', getStudents);
studentRouter.put('/', updateStudent);
studentRouter.delete('/', deleteStudent);

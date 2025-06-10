import { Router } from 'express';
import { authenticateUser } from '../controllers';

export const authRouter = Router();

authRouter.post('/', authenticateUser);

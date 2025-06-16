import { Router } from 'express';
import { authenticateUser, changePassword } from '../controllers';

export const authRouter = Router();

authRouter.post('/', authenticateUser);
authRouter.put('/', changePassword);
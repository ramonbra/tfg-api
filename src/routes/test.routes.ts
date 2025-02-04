import { Router } from 'express';
import { createTest, getTests, updateTest, deleteTest } from '../controllers';

export const testRouter = Router();

testRouter.post('/', createTest);
testRouter.get('/', getTests);
testRouter.put('/', updateTest);
testRouter.delete('/', deleteTest);

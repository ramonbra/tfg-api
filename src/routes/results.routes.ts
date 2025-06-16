import { Router } from 'express';
import { createResult, getResults } from '../controllers';

export const resultsRouter = Router();

resultsRouter.post('/', createResult);
resultsRouter.get('/', getResults);

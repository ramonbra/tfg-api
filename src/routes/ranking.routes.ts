import { Router } from 'express';
import { createRanking, getRanking, updateRanking, deleteRanking } from '../controllers';

export const rankingRouter = Router();

rankingRouter.post('/', createRanking);
rankingRouter.get('/', getRanking);
rankingRouter.put('/', updateRanking);
rankingRouter.delete('/', deleteRanking);

import { Router } from 'express';
import { downloadExampleXLSX } from '../controllers';

export const downloadRouter = Router();

downloadRouter.get('/', downloadExampleXLSX);

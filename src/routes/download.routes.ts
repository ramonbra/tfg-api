import { Router } from 'express';
import { downloadStudentsExampleXLSX, downloadQuestionsExampleXLSX } from '../controllers';

export const downloadRouter = Router();

downloadRouter.get('/questions', downloadQuestionsExampleXLSX);
downloadRouter.get('/students', downloadStudentsExampleXLSX);

import { Request, Response } from "express";
import path from "path";

export const downloadQuestionsExampleXLSX = (req: Request, res: Response) => {
    const filePath = path.join(__dirname, "../../extras/questionsExample.xlsx");
    res.download(filePath, "questionsExample.xlsx");
  };

  export const downloadStudentsExampleXLSX = (req: Request, res: Response) => {
    const filePath = path.join(__dirname, "../../extras/studentsExample.xlsx");
    res.download(filePath, "studentsExample.xlsx");
  };
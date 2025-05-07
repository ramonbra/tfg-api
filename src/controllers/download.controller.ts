import { Request, Response } from "express";
import path from "path";

export const downloadExampleXLSX = (req: Request, res: Response) => {
    const filePath = path.join(__dirname, "../../extras/example.xlsx");
    res.download(filePath, "example.xlsx");
  };
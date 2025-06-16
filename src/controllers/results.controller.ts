import { Request, Response } from "express";
import { ResultService } from "../services";

export const createResult = async( request: Request, response: Response ) => {
    try {
        const { id_student, id_test, correct_answers, wrong_answers } = request.body;
        const newResult = await ResultService.create({ id_student, id_test, correct_answers, wrong_answers });
        response.status(201).json(newResult);
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    }
}

export const getResults = async(request: Request, response: Response ) => {
    try{
      const id_user = Number(request.query.id_user);
      const isProfessor = Boolean(request.query.isProfessor);
      const isAdmin = Boolean(request.query.isAdmin);
      const results = await ResultService.get(id_user, isProfessor, isAdmin);
      response.status(200).json(results);
    } catch (error: any) {
      response.status(500).json({ message: error.message });
    } 
}

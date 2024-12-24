import { Request, Response } from "express";
import { ProfessorService } from "../services/professor.service";

export const createProfessor = async( request: Request, response: Response ) => {
    try {
        const { username, password, name, surname, school } = request.body;
        const newProfessor = await ProfessorService.create({ username, password, name, surname, school });
        response.status(201).json(newProfessor);
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    }
}

export const getProfessors = async(_request: Request, response: Response ) => {
    try{
        const professors = await ProfessorService.get();
        response.status(200).json(professors);
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    } 
}

export const updateProfessor = async( request: Request, response: Response ) => {
    try{
        const { id_professor, username, password, name, surname, school } = request.body;
        const updatedProfessor = await ProfessorService.update({ id_professor, username, password, name, surname, school });
        response.status(200).json(updatedProfessor);
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    } 
}

export const deleteProfessor = async( request: Request, response: Response ) => {
    try{
        const { id_professor } = request.body;
        const result = await ProfessorService.delete({ id_professor });
        response.status(200).json(result);
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    } 
}
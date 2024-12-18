import { Request, Response } from "express";
import * as ProfessorService from "../services/professor.service.js";

export const createProfessor = async( request, response ) => {
    console.log(request.body);
        response.status(200).json(1);
}

export const getProfessor = async( request, response ) => {
    console.log(request.body);
        response.status(200).json(1);
}

export const updateProfessor = async( request, response ) => {
    console.log(request.body);
        response.status(200).json(1);
}

export const deleteProfessor = async( request, response ) => {
    console.log(request.body);
        response.status(200).json(1);
}
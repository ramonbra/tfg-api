import { Request, Response } from "express";
import { QuestionService } from "../services/question.service";

export const createQuestion = async( request: Request, response: Response ) => {
    try {
        const { question, answers, correction, difficulty } = request.body;
        const newQuestion = await QuestionService.create({ question, answers, correction, difficulty });
        response.status(201).json(newQuestion);
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    }
}

export const getQuestions = async(_request: Request, response: Response ) => {
    try{
        const questions = await QuestionService.get();
        response.status(200).json(questions);
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    } 
}

export const updateQuestion = async( request: Request, response: Response ) => {
    try{
        const { id_question, question, answers, correction, difficulty } = request.body;
        const updatedQuestion = await QuestionService.update({ id_question, question, answers, correction, difficulty });
        response.status(200).json(updatedQuestion);
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    } 
}

export const deleteQuestion = async( request: Request, response: Response ) => {
    try{
        const { id_question } = request.body;
        if(!id_question){
            response.status(400).json({message: "id_question required"});
        }

        const result = await QuestionService.delete({ id_question });
        response.status(200).json(result);
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    } 
}

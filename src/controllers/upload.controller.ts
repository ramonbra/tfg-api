import { Request, Response } from "express";
import { QuestionService, StudentService } from "../services";

export const createMultipleQuestions = async ( request: Request, response: Response ) => {
    try {
        const inputData = request.body;
        if(!Array.isArray(inputData) || inputData.length === 0) response.status(400).json({ message: "No files uploaded" });
        await Promise.all(inputData.map(async (row: any) => {
            const { question, answers, correctAnswers, difficulty, labels, image, created_by } = row;
            try {
                if (!question || typeof question !== 'string') response.status(500).json({ message: 'No questions were found' }); 
                if (question.toLowerCase() === "example") return;

                await QuestionService.create({
                    question,
                    answers,
                    correctAnswers,
                    difficulty,
                    labels,
                    image,
                    created_by
                });
            } catch (error: any) {
                console.error(`Error creating question: ${error.message}`);
                throw error;
            }
        }));
        response.status(200).json({ message: "Everything ok" });
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    }
}

export const createMultipleStudents = async ( request: Request, response: Response ) => {
    try {
        const inputData = request.body;
        if(!Array.isArray(inputData) || inputData.length === 0) response.status(400).json({ message: "No files uploaded" });
        await Promise.all(inputData.map(async (row: any) => {
            const { username, password, name, surname, school, created_by } = row;
            try {
                if (!username || typeof username !== 'string') response.status(500).json({ message: 'No questions were found' }); 
                if (username.toLowerCase() === "example") return;

                await StudentService.create({
                    username,
                    password,
                    name,
                    surname,
                    school,
                    created_by
                });
            } catch (error: any) {
                console.error(`Error creating student: ${error.message}`);
                throw error;
            }
        }));
        response.status(200).json({ message: "Everything ok" });
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    }
}

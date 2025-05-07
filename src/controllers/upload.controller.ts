import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import xlsx from "@e965/xlsx";
import { QuestionService } from "../services";

export const createMultipleQuestions = async ( request: Request, response: Response ) => {
    try {
        if(!request.files || Object.keys(request.files).length === 0){
            response.status(400).json({ message: "No files uploaded" });
        } else {
            const file = request.files.file as UploadedFile;
            const xlsxData = xlsx.read(file.data);
            const sheet = xlsxData.Sheets[xlsxData.SheetNames[0]];
            const inputData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

            await Promise.all(inputData.map(( row:any ) => {
                const { question, answers, correctAnswers, difficulty, labels } = row;
                try {
                    if (!question || typeof question !== 'string') response.status(500).json({ message: 'No questions were found' }); 
                    if (question.toLowerCase() !== "example") {
                        QuestionService.create({
                            question,
                            answers,
                            correctAnswers,
                            difficulty,
                            labels
                        });
                    }
                } catch ( error: any ) {
                    console.error(`Error creating question: ${error.message}`);
                    throw error;
                }
            }));
            response.status(200).json({ message: "Everything ok" });
        }
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    }
}

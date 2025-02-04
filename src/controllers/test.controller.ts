import { Request, Response } from "express";
import { TestService } from "../services";
import { TestData } from "../models";

export const createTest = async ( request: Request, response: Response ) => {
    try {
        const { id_test, test_name, test_questions } = request.body;
        const newTest = await TestService.create({ id_test, test_name, test_questions });
        response.status(201).json(newTest);
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    }
}

export const getTests = async ( _request: Request, response: Response ) => {
    
    try {
        const tests = await TestService.get_test();

        const fullTests = await Promise.all(
            tests.map(async (test: TestData) => {
                const rows_qpt = await TestService.get_qpt(test.id_test);
                const questionIds = rows_qpt.map((row) => row.test_questions);

                return {
                    ...test,
                    test_questions: questionIds,
                };
            })
        );
        response.status(200).json(fullTests);
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    }
}

export const updateTest = async ( request: Request, response: Response ) => {
    try{
        const { id_test, test_name, test_questions } = request.body;
        const updatedTest = await TestService.update({ id_test, test_name, test_questions });
        response.status(200).json(updatedTest);
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    }
}

export const deleteTest = async ( request: Request, response: Response ) => {
    try{
        const { id_test } = request.body;
        if(!id_test){
            response.status(400).json({message: "id_test required"});
        }
        const result = await TestService.delete({ id_test });
        response.status(200).json(result);
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    } 
}

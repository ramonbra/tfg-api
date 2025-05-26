import { Request, Response } from "express";
import { TestService } from "../services";
import { TestData } from "../models";

export const getTests = async ( _request: Request, response: Response ) => {
    
    try {
        const rows = await TestService.get_tests();

        const testsMap = new Map<number, any>();

        rows.forEach((row) => {
            if(!testsMap.has(row.id_test)){
                testsMap.set(row.id_test, {
                    id_test: row.id_test,
                    test_name: row.test_name,
                    difficulty: row.difficulty,
                    labels: row.labels,
                    test_questions: [row.id_question],
                });
            } else {
                testsMap.get(row.id_test)!.test_questions.push(row.id_question);
            }
        });

        const fullTests: TestData[] = Array.from(testsMap.values());

        response.status(200).json(fullTests);
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    }
}

export const createTest = async ( request: Request, response: Response ) => {
    try {
        const { test_name, difficulty, labels, test_questions } = request.body;
        const newTest = await TestService.create({ test_name, difficulty, labels, test_questions });
        response.status(201).json(newTest);
    } catch (error: any) {
        console.error("Error al crear el test:",error);
        response.status(500).json({ message: error.message });
    }
}

export const updateTest = async ( request: Request, response: Response ) => {
    try{
        const { id_test, test_name, difficulty, labels, test_questions } = request.body;
        const updatedTest = await TestService.update({ id_test, test_name, difficulty, labels, test_questions });
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

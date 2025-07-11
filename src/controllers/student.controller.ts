import { Request, Response } from "express";
import { StudentService } from "../services";

export const createStudent = async( request: Request, response: Response ) => {
    try {
        const { username, password, name, surname, school, created_by } = request.body;
        const newStudent = await StudentService.create({ username, password, name, surname, school, created_by });
        response.status(201).json(newStudent);
    } catch (error: any) {
        console.log("CONTROLLER ERROR:",error);
        response.status(500).json({ message: error.message });
    }
}

export const getStudents = async(request: Request, response: Response ) => {
    try{
        const created_by = request.query.created_by ? Number(request.query.created_by) : undefined;
        const students = await StudentService.get(created_by);
        response.status(200).json(students);
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    } 
}

export const updateStudent = async( request: Request, response: Response ) => {
    try{
        const { id_student, username, password, name, surname, school } = request.body;
        const updatedStudent = await StudentService.update({ id_student, username, password, name, surname, school });
        response.status(200).json(updatedStudent);
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    } 
}

export const deleteStudent = async( request: Request, response: Response ) => {
    try{
        const { id_student } = request.body;
        const result = await StudentService.delete({ id_student });
        response.status(200).json(result);
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    } 
}
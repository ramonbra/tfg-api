import db from '../../config/db';
import Joi from 'joi';
import { 
    createStudentSchema, 
    updateStudentSchema,
    deleteStudentSchema
} from '../schemas';
import { StudentData } from '../models';
import { hashPassword } from './';
import { ResultSetHeader } from 'mysql2';

export const StudentService = {
    async create( studentData: any ) {
        const { error, value } = createStudentSchema.validate(studentData) as Joi.ValidationResult<StudentData>;
        if ( error ) {
            throw new Error(error.details[0].message);
        }

        const normalizedData = {
            ...value,
            username: value.username.toLowerCase(),
            password: await hashPassword(value.password),
        }

        const fields: string[] = [];
        const valuesFields: string[] = [];
        const values: any[] = [];

        fields.push("username");
        valuesFields.push("?");
        fields.push("password");
        valuesFields.push("?");

        values.push(normalizedData.username);
        values.push(normalizedData.password);

        if (value.name) {
            fields.push("name");
            valuesFields.push("?");
            values.push(normalizedData.name);
        }

        if (value.surname) {
            fields.push("surname");
            valuesFields.push("?");
            values.push(normalizedData.surname);
        }

        if (value.school) {
            fields.push("school");
            valuesFields.push("?");
            values.push(normalizedData.school);
        }

        fields.push("created_by");
        valuesFields.push("?");
        values.push(normalizedData.created_by);

        const query = `
        INSERT INTO students (${fields.join(", ")})
        VALUES (${valuesFields.join(", ")})
        `;

        const [result] = await db.execute<ResultSetHeader>(query, values);
        return { id: result.insertId, ...normalizedData };
    },

    async get(created_by?: number) {
        let query = `
        SELECT id_student, username, name, surname, school, created_by FROM students
        `;
        const values: any[] = [];
        
        if(created_by){
            query +=" WHERE created_by = ?";
            values.push(created_by);
        }

        const [rows] = await db.execute(query,values);
        return rows;
    },

    async update(studentData: any) {
        const { error, value } = updateStudentSchema.validate(studentData) as Joi.ValidationResult<StudentData>;
        if ( error ) {
            throw new Error(error.details[0].message);
        }

        const fields: string[] = [];
        const values: any[] = [];

        if (value.username) {
            fields.push("username = ?");
            values.push(value.username.toLowerCase());
        }

        if (value.password) {
            fields.push("password = ?");
            values.push(await hashPassword(value.password));
        }

        if (value.name) {
            fields.push("name = ?");
            values.push(value.name);
        }

        if (value.surname) {
            fields.push("surname = ?");
            values.push(value.surname);
        }

        if (value.school) {
            fields.push("school = ?");
            values.push(value.school);
        }

        if (fields.length === 0) {
            throw new Error("No hay campos que actualizar.");
        }

        values.push(value.id_student);

        const query = `
        UPDATE students 
        SET ${fields.join(", ")}
        WHERE id_student = ?
        `;

        const [result] = await db.execute<ResultSetHeader>(query, values);
        return { id: result.insertId, ...value };
    },

    async delete( studentData: any ) {
        const { error, value } = deleteStudentSchema.validate(studentData) as Joi.ValidationResult<StudentData>;
        if ( error ) {
            throw new Error(error.details[0].message);
        }

        const query = `
        DELETE FROM students
        WHERE id_student = ?
        `;

        console.log("ID: " + value.id_student);
        const values: any[] = [];
        values.push(value.id_student);

        await db.execute(query, values);
        return { message: `Se ha eliminado al estudiante con ID: ${value.id_student}` };
    },
}
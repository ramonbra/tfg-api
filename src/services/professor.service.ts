import db from '../../config/db.ts';
import Joi from 'joi';
import { 
    createProfessorSchema, 
    updateProfessorSchema
} from '../schemas/professor.schema.ts';
import { ProfessorData } from '../models/professor.model.ts';
import { hashPassword } from './hasher.service.ts';
import { ResultSetHeader } from 'mysql2';

export const ProfessorService = {
    async create( professorData: any ) {
        const { error, value } = createProfessorSchema.validate(professorData) as Joi.ValidationResult<ProfessorData>;
        if ( error ) {
            throw new Error(error.details[0].message);
        }

        const normalizedData = {
            ...value,
            username: value.username.toLowerCase(),
            password: await hashPassword(value.password),
        }

        const query = `
        INSERT INTO professors (username, password, name, surname, school)
        VALUES (?, ?, ?, ?, ?)
        `;
        const values = [
            normalizedData.username,
            normalizedData.password,
            normalizedData.name,
            normalizedData.surname,
            normalizedData.school,
        ];

        const [result] = await db.execute<ResultSetHeader>(query, values);
        return { id: result.insertId, ...normalizedData };
    },

    async get() {
        const query = `
        SELECT id_professor, name, surname, school, admin FROM professors
        `;
        const [rows] = await db.execute(query);
        return rows;
    },

    async update(professorData: any) {
        const { error, value } = updateProfessorSchema.validate(professorData) as Joi.ValidationResult<ProfessorData>;
        if ( error ) {
            throw new Error(error.details[0].message);
        }

        const fields: string[] = [];
        const values: any[] = [];

        if (value.name){
            fields.push("name = ?");
            values.push(value.name);
        }

        if (value.surname){
            fields.push("surname = ?");
            values.push(value.surname);
        }

        if (value.school){
            fields.push("school = ?");
            values.push(value.school);
        }

        if (value.password){
            fields.push("password = ?");
            values.push(hashPassword(value.password));
        }

        if(fields.length === 0){
            throw new Error("No hay campos que actualizar.");
        }

        values.push(value.id_professor);

        const query = `
        UPDATE professors 
        SET ${fields.join(", ")}
        WHERE id_professor = ?
        `;

        const [result] = await db.execute<ResultSetHeader>(query, values);
        return { id: result.insertId, ...value };
    },

    async delete( professorData: any ) {
        const { error, value } = updateProfessorSchema.validate(professorData) as Joi.ValidationResult<ProfessorData>;
        if ( error ) {
            throw new Error(error.details[0].message);
        }

        const query = `
        DELETE FROM professors
        WHERE id_professor = ?
        `;
        await db.execute(query, value.id_professor);
        return { message: `Se ha eliminado al profesor con ID: ${value.id_professor}` };
    },
}
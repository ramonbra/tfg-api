import db from '../../config/db.js';
import Joi from 'joi';
import { 
    createProfessorSchema, 
    updateProfessorSchema
} from '../schemas/professor.schema.js';
import { ProfessorData } from '../models/professor.model.js';
import { hashPassword } from './hasher.service.js';

export const ProfessorService = {
    async create( professorData ) {
        const { error, value } = createProfessorSchema.validate(professorData) as Joi.ValidationResult<ProfessorData>;
        if ( error ) {
            throw new Error(error.details[0].message);
        }

        const normalizedData = {
            ...value,
            username: value.username.toLowerCase(),
            password: hashPassword(value.password),
            admin: false,
        }

        const query = `
        INSERT INTO professors (username, password, name, surname, school, admin)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            normalizedData.username,
            normalizedData.password,
            normalizedData.name,
            normalizedData.surname,
            normalizedData.school,
            normalizedData.admin,
        ];

        const [result] = await db.execute(query, values);
        return { id: result.insertId, ...normalizedData };
    },

    async get() {
        const query = `
        SELECT id_professor, name, surname, school, admin FROM professors
        `;
        const [rows] = await db.execute(query);
        return rows;
    },

    async update( professorData ) {
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
        WHERE id = ?
        `;

        const [result] = await db.execute(query, values);
        return { id: result.insertId, ...value };
    },

    async delete( id_professor: number ) {
        const query = `
        DELETE FROM professors
        WHERE id_professor = ?
        `;
        await db.execute(query, id_professor);
        return { message: `Se ha eliminado al profesor con ID: ${id_professor}` };
    },
}
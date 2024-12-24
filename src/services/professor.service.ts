import db from '../../config/db.ts';
import Joi from 'joi';
import { 
    createProfessorSchema, 
    updateProfessorSchema,
    deleteProfessorSchema
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

        const query = `
        INSERT INTO professors (${fields.join(", ")})
        VALUES (${valuesFields.join(", ")})
        `;

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
        const { error, value } = deleteProfessorSchema.validate(professorData) as Joi.ValidationResult<ProfessorData>;
        if ( error ) {
            throw new Error(error.details[0].message);
        }

        const query = `
        DELETE FROM professors
        WHERE id_professor = ?
        `;

        console.log("ID: " + value.id_professor);
        const values: any[] = [];
        values.push(value.id_professor);

        await db.execute(query, values);
        return { message: `Se ha eliminado al profesor con ID: ${value.id_professor}` };
    },
}
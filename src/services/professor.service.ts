import db from '../../config/db.js';
import Joi from 'joi';
import { 
    createProfessorSchema, 
    updateProfessorSchema, 
    deleteProfessorSchema 
} from '../schemas/professor.schema.js';
import { ProfessorData } from '../models/professor.model.js';

export const ProfessorModel = {
    async create( professorData ) {
        const { error, value } = createProfessorSchema.validate(professorData) as Joi.ValidationResult<ProfessorData>;
        if ( error ) {
            throw new Error(error.details[0].message);
        }

        const normalizedData = {
            ...value,
            username: value.username.toLowerCase(),
        }

        const query = `
        INSERT INTO professors (id_professor, username, password, name, surname, school, admin)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            normalizedData.id_professor,
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

    async update( professorData ) {
        // MODIFY TO UPDATE
        const { error, value } = createProfessorSchema.validate(professorData) as Joi.ValidationResult<ProfessorData>;
        if ( error ) {
            throw new Error(error.details[0].message);
        }

        const normalizedData = {
            ...value,
            username: value.username.toLowerCase(),
        }

        const query = `
        INSERT INTO professors (id_professor, username, password, name, surname, school, admin)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            normalizedData.id_professor,
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

    async delete( professorData ) {
        // MODIFY TO DELETE
        const { error, value } = createProfessorSchema.validate(professorData) as Joi.ValidationResult<ProfessorData>;
        if ( error ) {
            throw new Error(error.details[0].message);
        }

        const normalizedData = {
            ...value,
            username: value.username.toLowerCase(),
        }

        const query = `
        INSERT INTO professors (id_professor, username, password, name, surname, school, admin)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            normalizedData.id_professor,
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
}
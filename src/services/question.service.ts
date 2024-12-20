import db from '../../config/db.ts';
import Joi from 'joi';
import { 
    createQuestionSchema, 
    updateQuestionSchema,
    deleteQuestionSchema
} from '../schemas/question.schema.ts';
import { QuestionData } from '../models/question.model.ts';
import { ResultSetHeader } from 'mysql2';

export const QuestionService = {
    async create( questionData: any ) {
        const { error, value } = createQuestionSchema.validate(questionData) as Joi.ValidationResult<QuestionData>;
        if ( error ) {
            throw new Error(error.details[0].message);
        }

        const query = `
        INSERT INTO questions (question, answers, correction, difficulty)
        VALUES (?, ?, ?, ?)
        `;

        const [result] = await db.execute<ResultSetHeader>(query, value);
        return { id: result.insertId, ...value };
    },

    async get() {
        const query = `
        SELECT id_question, question, answers, correction, difficulty FROM questions
        `;
        const [rows] = await db.execute(query);
        return rows;
    },

    async update(questionData: any) {
        const { error, value } = updateQuestionSchema.validate(questionData) as Joi.ValidationResult<QuestionData>;
        if ( error ) {
            throw new Error(error.details[0].message);
        }

        const fields: string[] = [];
        const values: any[] = [];

        if (value.question) {
            fields.push("question = ?");
            values.push(value.question);
        }

        if (value.answers) {
            fields.push("answers = ?");
            values.push(value.answers);
        }

        if (value.correction) {
            fields.push("correction = ?");
            values.push(value.correction);
        }

        if (value.difficulty) {
            fields.push("difficulty = ?");
            values.push(value.difficulty);
        }

        if (fields.length === 0) {
            throw new Error("No hay campos que actualizar.");
        }

        values.push(value.id_question);

        const query = `
        UPDATE questions 
        SET ${fields.join(", ")}
        WHERE id_question = ?
        `;

        const [result] = await db.execute<ResultSetHeader>(query, values);
        return { id: result.insertId, ...values };
    },

    async delete( questionData: any ) {
        const { error, value } = deleteQuestionSchema.validate(questionData) as Joi.ValidationResult<QuestionData>;
        if ( error ) {
            throw new Error(error.details[0].message);
        }

        const query = `
        DELETE FROM questions
        WHERE id_question = ?
        `;

        console.log("ID: " + value.id_question);
        const values: any[] = [];
        values.push(value.id_question);

        await db.execute(query, values);
        return { message: `Se ha eliminado la question con ID: ${value.id_question}` };
    },
}
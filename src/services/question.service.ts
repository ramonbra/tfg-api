import db from '../../config/db';
import Joi from 'joi';
import { 
    createQuestionSchema, 
    updateQuestionSchema,
    deleteQuestionSchema
} from '../schemas';
import { QuestionData } from '../models';
import { ResultSetHeader } from 'mysql2';

export const QuestionService = {
    async create( questionData: any ) {
        const { error, value } = createQuestionSchema.validate(questionData) as Joi.ValidationResult<QuestionData>;
        if ( error ) {
            throw new Error(error.details[0].message);
        }

        const query = `
        INSERT INTO questions (question, answers, correctAnswers, difficulty, labels, image, created_by)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            value.question,
            value.answers,
            value.correctAnswers,
            value.difficulty,
            value.labels,
            value.image,
            value.created_by,
        ]

        const [result] = await db.execute<ResultSetHeader>(query, values);
        return { id: result.insertId, ...value };
    },

    async get(created_by?: number) {
        let query = "SELECT * FROM questions";
        const values: any[] = [];

        if (created_by) {
            query += " WHERE created_by = ?";
            values.push(created_by);
        }
        
        const [rows] = await db.execute(query, values);
        return rows;
    },

    async update(questionData: any) {
        const { error, value } = updateQuestionSchema.validate(questionData) as Joi.ValidationResult<QuestionData>;
        if ( error ) {
            console.log("VALIDATION ERROR:", error.details);
            throw new Error(error.details[0].message);
        }

        const values = [
            value.question,
            value.answers,
            value.correctAnswers,
            value.difficulty,
            value.labels,
            value.image,
            value.id_question,
        ]
        
        const query = `
        UPDATE questions 
        SET question = ?, answers = ?, correctAnswers = ?, difficulty = ?, labels = ?, image = ?
        WHERE id_question = ?
        `;

        const [result] = await db.execute<ResultSetHeader>(query, values);
        return { id: result.insertId, ...value };
    },

    async delete( questionData: any ) {
        const { error, value } = deleteQuestionSchema.validate(questionData);
        if ( error ) {
            throw new Error(error.details[0].message);
        }

        await db.execute("DELETE FROM questions_per_test WHERE id_question = ?", [value.id_question]);
        await db.execute("DELETE FROM questions WHERE id_question = ?", [value.id_question]);

        return { message: `Se ha eliminado la question con ID: ${value.id_question}` };
    },
}
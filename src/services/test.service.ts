import Joi from "joi";
import { baseTestSchema, deleteTestSchema } from "../schemas"
import { TestData } from "../models";
import db from "../../config/db";
import { ResultSetHeader } from "mysql2";

export const TestService = {
    async create( testData: any ){
        const { error, value } = baseTestSchema.validate(testData) as Joi.ValidationResult<TestData>;
        if ( error ) {
            throw new Error( error.details[0].message );
        }

        const query_test = `
        INSERT INTO tests (test_name, difficulty, labels)
        VALUES (?, ?, ?)
        `;

        const [result_test] = await db.execute<ResultSetHeader>(query_test, [value.test_name, value.difficulty, value.labels]);

        const testId = result_test.insertId;

        const combinedValues = value.test_questions.map(qId => [testId, qId]);
        const fields = combinedValues.map(() => "(?, ?)").join(", ");
        const flatValues = combinedValues.flat();

        const query_qpt = `
        INSERT INTO questions_per_test (id_test, id_question)
        VALUES ${fields}
        `

        const [result_qpt] = await db.execute<ResultSetHeader>(query_qpt, flatValues);
        return {id: result_qpt.insertId, ...value}
    },

    async get_tests() {
        const query = `
        SELECT t.id_test, t.test_name, t.difficulty, t.labels, qpt.id_question 
        FROM tests t
        LEFT JOIN questions_per_test qpt ON t.id_test = qpt.id_test;
        `;

        type RawRow = {
            id_test: number;
            test_name: string;
            difficulty: string;
            labels: string;
            id_question: number;
        };
        
        const [rows] = await db.execute(query) as [RawRow[], any];
        return rows;
    },

    async update( testData: any ) {
        console.log("SERVICE testdata:",testData);
        const { error, value } = baseTestSchema.validate(testData) as Joi.ValidationResult<TestData>;
        if ( error ){
            throw new Error( error.details[0].message );
        }

        const values_test = [
            value.test_name,
            value.difficulty,
            value.labels,
            value.id_test
        ];

        const query_test = `
        UPDATE tests
        SET test_name = ?, difficulty = ?, labels = ?
        WHERE id_test = ?
        `;

        const [ result_test ] = await db.execute<ResultSetHeader>(query_test, values_test);

        const query_qpt_delete = `
        DELETE FROM questions_per_test 
        WHERE id_test = ?
        `;

        const [result_qpt_delete] = await db.execute<ResultSetHeader>(query_qpt_delete, [value.id_test]);

        if(value.test_questions.length > 0) {
            const values_qpt = value.test_questions.map(qId => [value.id_test, qId]);
            const fields = values_qpt.map(() => "(?, ?)").join(", ");
            const flatValues = values_qpt.flat();

            const query_qpt = `
            INSERT INTO questions_per_test (id_test, id_question)
            VALUES ${fields}
            `;
            
            const [ result_qpt ] = await db.execute<ResultSetHeader>(query_qpt, flatValues);
            console.log("SERVICE result_qpt:",result_qpt);
        }

        return { id: result_test.insertId, ...value };
    },

    async delete ( id_test: any ) {
        const { error, value } = deleteTestSchema.validate(id_test) as Joi.ValidationResult<TestData>;
        if ( error ) {
            throw new Error( error.details[0].message );
        }

        const query_test_delete = `
        DELETE FROM tests
        WHERE id_test = ?
        `

        const query_qpt_delete = `
        DELETE FROM questions_per_test 
        WHERE id_test = ?
        `
        const [ result_qpt_delete ] = await db.execute<ResultSetHeader>(query_qpt_delete, [value.id_test]);
        const [ result_test_delete ] = await db.execute<ResultSetHeader>(query_test_delete, [value.id_test]);
        return { message: `Se ha eliminado el test con ID: ${value.id_test}` };
    }
}

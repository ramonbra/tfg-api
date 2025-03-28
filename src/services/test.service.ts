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
        INSERT INTO test (test_name, difficulty)
        VALUES (?, ?)
        `;

        const [result_test] = await db.execute<ResultSetHeader>(query_test, [value.test_name]);

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

    async get_test() {
        const query = `
        SELECT id_test, test_name, difficulty FROM test
        `;
        const [rows] = await db.execute(query) as [TestData[], any];
        return rows;
    },

    async get_qpt( testId: number ) {
        const query = `
        SELECT id_test, id_question FROM questions_per_test
        WHERE id_test = ?
        `;
        const [rows] = await db.execute(query, [testId]) as [TestData[], any];
        return rows;
    },

    async update( testData: any ) {
        const { error, value } = baseTestSchema.validate(testData) as Joi.ValidationResult<TestData>;
        if ( error ){
            throw new Error( error.details[0].message );
        }

        const values_test = [
            value.test_name,
            value.id_test
        ];

        const query_test = `
        UPDATE test
        SET test_name
        WHERE id_test = ?
        `;

        const [ result_test ] = await db.execute<ResultSetHeader>(query_test, values_test);

        const query_delete = `
        DELETE FROM questions_per_test 
        WHERE id_test = ?
        `;

        await db.execute(query_delete, [value.id_test]);

        if(value.test_questions.length > 0) {
            const values_qpt = value.test_questions.map(qId => [value.id_test, qId]);
            const fields = values_qpt.map(() => "(?, ?)").join(", ");
            const flatValues = values_qpt.flat();

            const query_qpt = `
            INSERT INTO questions_per_test (id_test, id_question)
            VALUES ${fields}
            `;
            
            const [ result_qpt ] = await db.execute<ResultSetHeader>(query_qpt, flatValues);
        }

        return { id: result_test.insertId, ...value };
    },

    async delete ( testData: any ) {
        const { error, value } = deleteTestSchema.validate(testData) as Joi.ValidationResult<TestData>;
        if ( error ) {
            throw new Error( error.details[0].message );
        }

        const query_delete = `
        DELETE FROM questions_per_test 
        WHERE id_test = ?
        `

        const [ result_delete ] = await db.execute<ResultSetHeader>(query_delete, [value.id_test]);
        return { message: `Se ha eliminado la question con ID: ${value.id_test}` };
    }
}

import db from '../../config/db';
import { 
    createResultSchema,
} from '../schemas';
import { ResultSetHeader } from 'mysql2';

export const ResultService = {
  async create( resultData: any ) {
    const { error, value } = createResultSchema.validate(resultData);
    if ( error ) {
        throw new Error(error.details[0].message);
    }

    const values: any[] = [];

    values.push(value.id_test);
    values.push(value.id_student);
    values.push(value.correct_answers);
    values.push(value.wrong_answers);
    

    const query = `
    INSERT INTO test_results (id_test, id_student, correct_answers, wrong_answers)
    VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute<ResultSetHeader>(query, values);
    return { id: result.insertId };
  },

  async get(id_user: number, isProfessor:boolean, isAdmin: boolean) {
    const values: any[] = [];

    let query = `
    SELECT 
      r.id_result,
      r.correct_answers,
      r.wrong_answers,
      r.id_test,
      t.test_name,
      r.id_student,
      s.username,
      r.taken_at 
    FROM test_results r
    JOIN students s ON r.id_student = s.id_student
    JOIN tests t ON r.id_test = t.id_test
    `;

    if(isProfessor && !isAdmin) {
      query += ` WHERE s.created_by = ?`
      values.push(id_user);
    } else if (!isProfessor){
      query += ` WHERE r.id_student = ?`
      values.push(id_user);
    }

    query += ` ORDER BY r.taken_at DESC`

    const [rows] = await db.execute(query, values);
    return rows;
  }
}
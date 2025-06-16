import { ResultSetHeader } from 'mysql2';
import db from '../../config/db';
import { changePassword } from '../controllers';
import { 
    authenticateUserSchema
} from '../schemas';
import { comparePasswords, hashPassword } from './hasher.service';

export const AuthService = {
  async authenticate( user: any ) {
    const { error, value } = authenticateUserSchema.validate(user);
    if ( error ) {
        throw new Error(error.details[0].message);
    }

    const normalizedData = {
      username: value.username.toLowerCase(),
    }

    const queryStudent = `
    SELECT id_student AS id, username, password 
    FROM students 
    WHERE username = ? 
    `

    const [studentRows] = await db.execute(queryStudent,[normalizedData.username]) as [any[], any];

    if(studentRows.length > 0) {
      const isMatch = await comparePasswords(value.password, studentRows[0].password);
      if (!isMatch) throw new Error("Incorrect password");

      const {password, ...rest} = studentRows[0];
      return { ...rest, role: "student", admin: 0}
    } 

    const queryProfessor = `
    SELECT id_professor AS id, username, password, admin 
    FROM professors
    WHERE username = ? 
    `

    const [professorRows] = await db.execute(queryProfessor,[normalizedData.username]) as [any[], any];

    if(professorRows.length > 0) {
      const isMatch = await comparePasswords(value.password, professorRows[0].password);
      if (!isMatch) throw new Error("Incorrect password");

      const {password, ...rest} = professorRows[0];
      return { ...rest, role: "professor"}
    } 

    throw new Error("User not found");
  },

  async changePassword( user_id: number, user_role: string, newPassword: string ) {
    let query: string = "";
    const values: any[] = [];

    
    if(user_role === "professor"){
      query += `
        UPDATE professors 
        SET password = ?
        WHERE id_professor = ?
      `;
    } else {
      query += `
        UPDATE students 
        SET password = ?
        WHERE id_student = ?
      `;
    }
    values.push(await hashPassword(newPassword));
    values.push(user_id);

    const [result] = await db.execute<ResultSetHeader>(query, values);
    return { id: result.insertId };
  }
};

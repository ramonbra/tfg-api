import db from '../../config/db';
import { 
    authenticateUserSchema
} from '../schemas';
import { comparePasswords } from './hasher.service';

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
};

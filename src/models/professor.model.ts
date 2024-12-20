export class ProfessorData {
    constructor(
        public id_professor: number,
        public username: string,
        public password: string,
        public admin: boolean,
        public name?: string,
        public surname?: string,
        public school?: string,
    ){}
}

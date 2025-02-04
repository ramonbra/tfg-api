export class StudentData {
    constructor(
        public id_student: number,
        public username: string,
        public password: string,
        public name?: string,
        public surname?: string,
        public school?: string,
    ){}
}
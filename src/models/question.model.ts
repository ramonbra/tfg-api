export class QuestionData {
    constructor(
        public id_question: number,
        public question: string,
        public answers: string,
        public correctAnswers: string,
        public difficulty: string,
        public labels: string,
        public image: string,
        public created_by: number,
    ){}
    }

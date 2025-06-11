export class TestData {
    constructor(
        public id_test: number,
        public test_name: string,
        public difficulty: string,
        public labels: string,
        public test_questions: number[],
        public created_by: number,
    ){}
}
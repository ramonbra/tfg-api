import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import professorRouter from "./src/routes/professor.routes.ts";
import questionRouter from "./src/routes/question.routes.ts";

dotenv.config();
const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use('/professor', professorRouter);
app.use('/question', questionRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

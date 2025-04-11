import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { professorRouter, questionRouter, /*rankingRouter,*/ studentRouter, testRouter, uploadRouter } from "./src/routes";


dotenv.config();
const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use('/professor', professorRouter);
app.use('/question', questionRouter);
// app.use('/ranking', rankingRouter);
app.use('/student', studentRouter);
app.use('/test', testRouter);
app.use('/upload', uploadRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

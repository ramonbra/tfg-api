import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { 
    authRouter,
    downloadRouter, 
    professorRouter, 
    questionRouter, 
    resultsRouter,
    studentRouter, 
    testRouter, 
    uploadRouter
} from "./src/routes";


dotenv.config();
const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use('/auth', authRouter);
app.use('/download', downloadRouter);
app.use('/professor', professorRouter);
app.use('/question', questionRouter);
app.use('/results', resultsRouter);
app.use('/student', studentRouter);
app.use('/test', testRouter);
app.use('/upload', uploadRouter);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

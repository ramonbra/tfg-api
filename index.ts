import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { 
    authRouter,
    downloadRouter, 
    professorRouter, 
    questionRouter, 
    /*rankingRouter,*/ 
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
// app.use('/ranking', rankingRouter);
app.use('/student', studentRouter);
app.use('/test', testRouter);
app.use('/upload', uploadRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

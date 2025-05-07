import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { 
    professorRouter, 
    questionRouter, 
    /*rankingRouter,*/ 
    studentRouter, 
    testRouter, 
    uploadRouter, 
    downloadRouter 
} from "./src/routes";


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
app.use('/download', downloadRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

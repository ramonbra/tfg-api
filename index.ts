import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import professorRouter from "./src/routes/professor.routes.ts";
import { hashPassword } from "./src/services/hasher.service.ts";

dotenv.config();
const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use('/professor', professorRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

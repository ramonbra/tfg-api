import express from "express";
import cors from "cors";
import db from "./config/db.js";
import dotenv from "dotenv";
import professorRouter from "./src/routes/professor.routes.js";

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

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { config } from "dotenv";

config();
connectDB(process.env.MYSQL_URL);
const app = express();

app.use(cors({
    origin: '*'
}));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

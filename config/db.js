import mysql from "mysql";

export const connectDB = async (url) => {
    mysql.createConnection({
        host: url,
        user: "root",
        password: "root",
        database: "tfg",
    });
}

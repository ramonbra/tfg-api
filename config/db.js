import mysql from "mysql";

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "tfg",
});

export default db;
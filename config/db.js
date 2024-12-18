import mysql from "mysql";

const db = mysql.createPool({
    host: url,
    user: "root",
    password: "root",
    database: "tfg",
});

export default db;
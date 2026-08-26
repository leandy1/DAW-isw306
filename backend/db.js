const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    ssl: {
        rejectUnauthorized: false
    },

    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    connectTimeout: 10000
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error de conexión a MySQL:", err);
        return;
    }

    console.log("Conectado correctamente a Aiven MySQL");

    connection.release();
});

module.exports = pool;
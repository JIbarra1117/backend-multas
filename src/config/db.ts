import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Crear el pool una sola vez
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // puedes ajustar este número
  queueLimit: 0,
});

export const connectDB = async () => {
  return pool; // devuelve el pool en lugar de una conexión directa
};

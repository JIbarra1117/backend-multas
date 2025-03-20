import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });
        console.log('✅ Conectado a MySQL');
        return connection;
    } catch (error) {
        console.error('❌ Error conectando a MySQL:', error);
        process.exit(1);
    }
};

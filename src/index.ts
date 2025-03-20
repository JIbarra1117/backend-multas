import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './infrastructure/routes/authRoutes';
import multaRoutes from './infrastructure/routes/multaRoutes';
import { errorHandler } from './infrastructure/middleware/errorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger.json';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
    try {
        await connectDB();
        console.log("✅ Base de datos conectada");
    } catch (error) {
        console.error("❌ Error al conectar a la base de datos", error);
        process.exit(1);
    }
})();

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/multas', multaRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en el puerto ${PORT}`));

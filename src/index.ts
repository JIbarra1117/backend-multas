import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db";
import authRoutes from "./infrastructure/routes/authRoutes";
import multaRoutes from "./infrastructure/routes/multaRoutes";
import { errorHandler } from "./infrastructure/middleware/errorHandler";
import { MultaSocket } from "./infrastructure/websockets/MultaSocket";
import morgan from "morgan";
import userRoutes from "./infrastructure/routes/userRoutes";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger.json';

dotenv.config();

const app = express();

// Solo en desarrollo
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

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

// Inicializar el manejador de WebSockets
const multaSocket = new MultaSocket(io);

io.on("connection", (socket) => {
  console.log(`🟢 Cliente conectado: ${socket.id}`);

  socket.emit("mensaje", "Conexión exitosa al WebSocket!");

  socket.on("disconnect", () => {
    console.log(`🔴 Cliente desconectado: ${socket.id}`);
  });
});

// Ruta de prueba para WebSocket
app.get("/test-ws", (req, res) => {
  io.emit("mensaje", "Mensaje de prueba enviado desde el servidor");
  res.json({ message: "Mensaje de prueba enviado a WebSockets" });
});

// Rutas de la API
app.use("/api/auth", authRoutes);
app.use("/api/multas", multaRoutes);
app.use("/api/usuarios", userRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`)
);

export { multaSocket };

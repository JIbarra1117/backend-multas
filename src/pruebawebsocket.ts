import io from "socket.io-client";

// Conectar con el WebSocket del backend
const socket = io("http://localhost:5000", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Escuchar evento de conexión
socket.on("connect", () => {
  console.log("🟢 Conectado al WebSocket con ID:", socket.id);
});

// Escuchar el evento "nuevaMulta"
socket.on("nuevaMulta", (data: any) => {
  console.log("🔔 Nueva Multa Recibida:", data);
});

// Manejo de desconexión
socket.on("disconnect", () => {
  console.log("🔴 Desconectado del WebSocket");
});

// Manejar errores de conexión
socket.on("connect_error", (error: Error) => {
  console.error("❌ Error en WebSocket:", error.message);
});

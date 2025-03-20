import { Server, Socket } from "socket.io";

export class MultaSocket {
    private io: Server;

    constructor(io: Server) {
        this.io = io;
        this.setupListeners();
    }

    private setupListeners() {
        this.io.on("connection", (socket: Socket) => {
            console.log(`🟢 Cliente conectado: ${socket.id}`);

            // Escuchar evento de desconexión
            socket.on("disconnect", () => {
                console.log(`🔴 Cliente desconectado: ${socket.id}`);
            });
        });
    }

    // Método para emitir notificación de nueva multa
    public emitirNuevaMulta(multa: any) {
        this.io.emit("nuevaMulta", multa);
    }
}

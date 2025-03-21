import { IMultaRepository } from "../../domain/repositories/IMultaRepository";
import { RegistroMulta } from "../../domain/entities/RegistroMulta";
import { multaSocket } from "../../index"; // Importamos la instancia de WebSocket

export class CreateMulta {
  constructor(private multaRepository: IMultaRepository) {}

  async execute(
    usuarioMultadoId: number,
    usuarioAutorId: number,
    descripcion: string
  ) {
    if (!descripcion) {
      throw new Error("❌ La descripción de la multa es obligatoria");
    }

    const multa = new RegistroMulta(
      0, // ID autoincrementable en la BD
      usuarioMultadoId,
      usuarioAutorId,
      descripcion,
      0, // Inicialmente sin aprobaciones
      false, // No aprobada
      new Date(), // Fecha de creación
      new Date() // Fecha de actualización
    );

    await this.multaRepository.create(multa);

    // Emitir evento WebSocket cuando se crea una multa
    multaSocket.emitirNuevaMulta({
      usuarioMultadoId,
      descripcion,
      aprobaciones: 0,
      aprobado: false,
    });
  }
}

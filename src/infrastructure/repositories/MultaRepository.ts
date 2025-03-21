import { IMultaRepository } from "../../domain/repositories/IMultaRepository";
import { connectDB } from "../../config/db";
import { RegistroMulta } from "../../domain/entities/RegistroMulta";

export class MultaRepository implements IMultaRepository {
  async create(multa: {
    usuarioMultadoId: number;
    usuarioAutorId: number;
    descripcion: string;
  }) {
    const db = await connectDB();
    await db.execute(
      "INSERT INTO registro_multas (usuario_multado_id, usuario_autor_id, descripcion, aprobaciones, aprobado) VALUES (?, ?, ?, 0, FALSE)",
      [multa.usuarioMultadoId, multa.usuarioAutorId, multa.descripcion]
    );
  }

  async findById(multaId: number) {
    const db = await connectDB();
    const [rows]: any = await db.execute(
      "SELECT * FROM registro_multas WHERE id = ?",
      [multaId]
    );
    return rows.length ? rows[0] : null;
  }

  async addApproval(multaId: number, usuarioId: number) {
    const db = await connectDB();
    await db.execute(
      "INSERT INTO aprobaciones (registro_multa_id, usuario_id) VALUES (?, ?)",
      [multaId, usuarioId]
    );
  }

  async countApprovals(multaId: number): Promise<number> {
    const db = await connectDB();
    const [rows]: any = await db.execute(
      "SELECT COUNT(*) AS total FROM aprobaciones WHERE registro_multa_id = ?",
      [multaId]
    );
    return rows[0].total;
  }

  async approve(multaId: number) {
    const db = await connectDB();
    await db.execute(
      "UPDATE registro_multas SET aprobado = TRUE WHERE id = ?",
      [multaId]
    );
  }

  async findAll(): Promise<RegistroMulta[]> {
    const db = await connectDB();
    const [rows] = await db.execute(
      "SELECT id, usuario_multado_id, usuario_autor_id, multa_id, descripcion, fecha_aplicacion, aprobaciones, aprobado FROM registro_multas"
    );
    return rows as RegistroMulta[];
  }
}

import { IMultaRepository } from "../../domain/repositories/IMultaRepository";
import { connectDB } from "../../config/db";

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

  async findAllTipos(): Promise<{ id: number; nombre: string }[]> {
    const db = await connectDB();
    const [rows] = await db.execute("SELECT id, descripcion FROM multas");
    return rows as { id: number; nombre: string }[];
  }
}
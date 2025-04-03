import { IRegistroMultaRepository } from "../../domain/repositories/IRegistroMultaRepository";
import { connectDB } from "../../config/db";
import { HistorialMulta } from "../../domain/entities/HistorialMulta";

export class RegistroMultaRepository implements IRegistroMultaRepository {
  async create(multa: {
    multaId: number;
    usuarioMultadoId: number;
    usuarioAutorId: number;
    descripcion: string;
  }) {
    const db = await connectDB();
    console.log(multa);
    await db.execute(
      "INSERT INTO registro_multas (multa_id, usuario_multado_id, usuario_autor_id, descripcion, aprobaciones, aprobado) VALUES (?, ?, ?, ?, 0, FALSE)",
      [
        multa.multaId,
        multa.usuarioMultadoId,
        multa.usuarioAutorId,
        multa.descripcion,
      ]
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

  async findAll(): Promise<HistorialMulta[]> {
    const db = await connectDB();
    const [rows]: any[] = await db.execute(
      `
      SELECT 
        rm.id,
        rm.descripcion,
        rm.fecha_aplicacion,
        rm.aprobaciones,
        rm.aprobado,
        rm.usuario_multado_id,
        rm.usuario_autor_id,
        rm.multa_id,
        u1.nombre AS nombre_multado,
        u2.nombre AS nombre_autor,
        m.descripcion AS tipo_multa
      FROM registro_multas rm
      JOIN usuarios u1 ON rm.usuario_multado_id = u1.id
      JOIN usuarios u2 ON rm.usuario_autor_id = u2.id
      JOIN multas m ON rm.multa_id = m.id
      ORDER BY rm.fecha_aplicacion DESC
      `
    );

    return rows.map((row: any) => ({
      id: row.id,
      descripcion: row.descripcion,
      fecha_aplicacion: row.fecha_aplicacion,
      aprobaciones: row.aprobaciones,
      aprobado: !!row.aprobado,
      usuarioMultado: {
        id: row.usuario_multado_id,
        nombre: row.nombre_multado,
      },
      usuarioAutor: {
        id: row.usuario_autor_id,
        nombre: row.nombre_autor,
      },
      tipoMulta: {
        id: row.multa_id,
        descripcion: row.tipo_multa,
      },
    }));
  }
  async obtenerResumenPorUsuario(): Promise<any[]> {
    const db = await connectDB();
    const [rows]: any = await db.execute(`
      SELECT 
        u.id AS usuario_id,
        u.nombre,
        COUNT(rm.id) AS total_multas,
        SUM(CASE WHEN rm.aprobado = 1 THEN 1 ELSE 0 END) AS aprobadas,
        SUM(CASE WHEN rm.aprobado = 0 THEN 1 ELSE 0 END) AS pendientes
      FROM usuarios u
      LEFT JOIN registro_multas rm ON rm.usuario_multado_id = u.id
      GROUP BY u.id, u.nombre
      ORDER BY total_multas DESC
    `);

    return rows;
  }

  async getCountAprove(
    registro_multa_id: number,
    usuario_id: number
  ): Promise<number> {
    const db = await connectDB();
    const [rows]: any = await db.execute(
      `SELECT count(id) as countRegisters FROM gestion_multas.aprobaciones
        WHERE registro_multa_id = ? AND usuario_id = ?
    `,
      [registro_multa_id, usuario_id]
    );
    return rows[0].countRegisters;
  }

  async getPendientesParaAprobar(userId: number): Promise<HistorialMulta[]> {
    const db = await connectDB();
    const [rows]: any[] = await db.execute(
      `
      SELECT 
        rm.id,
        rm.descripcion,
        rm.fecha_aplicacion,
        rm.aprobaciones,
        rm.aprobado,
        rm.usuario_multado_id,
        rm.usuario_autor_id,
        rm.multa_id,
        u1.nombre AS nombre_multado,
        u2.nombre AS nombre_autor,
        m.descripcion AS tipo_multa
      FROM registro_multas rm
      JOIN usuarios u1 ON rm.usuario_multado_id = u1.id
      JOIN usuarios u2 ON rm.usuario_autor_id = u2.id
      JOIN multas m ON rm.multa_id = m.id
      WHERE rm.aprobado = FALSE
        AND NOT EXISTS (
          SELECT 1 FROM aprobaciones a
          WHERE a.registro_multa_id = rm.id
            AND a.usuario_id = ?
        )
      ORDER BY rm.fecha_aplicacion DESC
      `,
      [userId]
    );

    return rows.map((row: any) => ({
      id: row.id,
      descripcion: row.descripcion,
      fecha_aplicacion: row.fecha_aplicacion,
      aprobaciones: row.aprobaciones,
      aprobado: !!row.aprobado,
      usuarioMultado: {
        id: row.usuario_multado_id,
        nombre: row.nombre_multado,
      },
      usuarioAutor: {
        id: row.usuario_autor_id,
        nombre: row.nombre_autor,
      },
      tipoMulta: {
        id: row.multa_id,
        descripcion: row.tipo_multa,
      },
    }));
  }

  async getAprobadasPorUsuario(userId: number): Promise<HistorialMulta[]> {
    const db = await connectDB();
    const [rows]: any[] = await db.execute(
      `
      SELECT 
        rm.id,
        rm.descripcion,
        rm.fecha_aplicacion,
        rm.aprobaciones,
        rm.aprobado,
        rm.usuario_multado_id,
        rm.usuario_autor_id,
        rm.multa_id,
        u1.nombre AS nombre_multado,
        u2.nombre AS nombre_autor,
        m.descripcion AS tipo_multa
      FROM registro_multas rm
      JOIN aprobaciones a ON a.registro_multa_id = rm.id
      JOIN usuarios u1 ON rm.usuario_multado_id = u1.id
      JOIN usuarios u2 ON rm.usuario_autor_id = u2.id
      JOIN multas m ON rm.multa_id = m.id
      WHERE a.usuario_id = ?
      ORDER BY rm.fecha_aplicacion DESC
      `,
      [userId]
    );

    return rows.map((row: any) => ({
      id: row.id,
      descripcion: row.descripcion,
      fecha_aplicacion: row.fecha_aplicacion,
      aprobaciones: row.aprobaciones,
      aprobado: !!row.aprobado,
      usuarioMultado: {
        id: row.usuario_multado_id,
        nombre: row.nombre_multado,
      },
      usuarioAutor: {
        id: row.usuario_autor_id,
        nombre: row.nombre_autor,
      },
      tipoMulta: {
        id: row.multa_id,
        descripcion: row.tipo_multa,
      },
    }));
  }
}

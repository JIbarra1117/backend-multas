import { IMultaCatalogoRepository } from "../../domain/repositories/IMultaCatalogoRepository";
import { Multa } from "../../domain/entities/Multa";
import { connectDB } from "../../config/db";

export class MultaCatalogoRepository implements IMultaCatalogoRepository {
  async findAll(): Promise<Multa[]> {
    const db = await connectDB();
    const [rows]: any = await db.execute("SELECT id, descripcion FROM multas");
    return rows.map((row: any) => new Multa(row.id, row.descripcion));
  }

  async create(descripcion: string): Promise<Multa> {
    const db = await connectDB();
    const [result]: any = await db.execute(
      "INSERT INTO multas (descripcion) VALUES (?)",
      [descripcion]
    );
    return new Multa(result.insertId, descripcion);
  }
}
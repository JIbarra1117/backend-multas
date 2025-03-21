import { Multa } from "../entities/Multa";

export interface IMultaCatalogoRepository {
  findAll(): Promise<Multa[]>;
  create(descripcion: string): Promise<Multa>;
}

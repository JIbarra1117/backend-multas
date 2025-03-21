import { RegistroMulta } from "../entities/RegistroMulta";

export interface IMultaRepository {
  create(multa: RegistroMulta): Promise<void>;
  findById(multaId: number): Promise<RegistroMulta | null>;
  addApproval(multaId: number, usuarioId: number): Promise<void>;
  countApprovals(multaId: number): Promise<number>;
  approve(multaId: number): Promise<void>;
  findAll(): Promise<RegistroMulta[]>;
}

import { HistorialMulta } from "../entities/HistorialMulta";
import { RegistroMulta } from "../entities/RegistroMulta";

export interface IRegistroMultaRepository {
  create(multa: RegistroMulta): Promise<void>;
  findById(multaId: number): Promise<RegistroMulta | null>;
  addApproval(multaId: number, usuarioId: number): Promise<void>;
  countApprovals(multaId: number): Promise<number>;
  approve(multaId: number): Promise<void>;
  findAll(): Promise<HistorialMulta[]>;
  obtenerResumenPorUsuario():Promise<any[]>;
  getCountAprove(registro_multa_id: number, usuario_id: number):Promise<number>;
  getPendientesParaAprobar(userId: number): Promise<HistorialMulta[]>;
  getAprobadasPorUsuario(userId: number): Promise<HistorialMulta[]>;  
}

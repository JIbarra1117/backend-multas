import { Multa } from '../entities/Multa';

export interface IMultaRepository {
    create(multa: Multa): Promise<void>;
    findById(multaId: number): Promise<Multa | null>;
    addApproval(multaId: number, usuarioId: number): Promise<void>;
    countApprovals(multaId: number): Promise<number>;
    approve(multaId: number): Promise<void>;
    findAllTipos(): Promise<{ id: number; nombre: string }[]>;
}

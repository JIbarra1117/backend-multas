import { IMultaRepository } from '../../domain/repositories/IMultaRepository';

export class ApproveMulta {
    constructor(private multaRepository: IMultaRepository) {}

    async execute(multaId: number, usuarioId: number) {
        const multa = await this.multaRepository.findById(multaId);
        if (!multa) {
            throw new Error('❌ Multa no encontrada');
        }

        if (multa.aprobado) {
            throw new Error('✅ La multa ya fue aprobada');
        }

        await this.multaRepository.addApproval(multaId, usuarioId);

        const totalAprobaciones = await this.multaRepository.countApprovals(multaId);
        if (totalAprobaciones >= 2) {
            await this.multaRepository.approve(multaId);
        }
    }
}
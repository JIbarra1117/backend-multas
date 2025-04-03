import { IRegistroMultaRepository } from "../../domain/repositories/IRegistroMultaRepository";

export class ApproveMulta {
  constructor(private multaRepository: IRegistroMultaRepository) {}

  async execute(multaId: number, usuarioId: number) {
    const multa = await this.multaRepository.findById(multaId);
    if (!multa) {
      throw new Error("❌ Multa no encontrada");
    }

    if (multa.aprobado) {
      throw new Error("✅ La multa ya fue aprobada");
    }

    const approveCount = await this.multaRepository.getCountAprove(
      multaId,
      usuarioId
    );

    console.log(JSON.stringify(approveCount));

    const totalAprobaciones = await this.multaRepository.countApprovals(
      multaId
    );
    console.log(totalAprobaciones);

    if (!(approveCount == 0)) {
      throw new Error("✅ La multa ya fue aprobada");
    }

    await this.multaRepository.addApproval(multaId, usuarioId);
    if (totalAprobaciones >= 3) {
      await this.multaRepository.approve(multaId);
    }
  }
}

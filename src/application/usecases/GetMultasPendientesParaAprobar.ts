import { IRegistroMultaRepository } from "../../domain/repositories/IRegistroMultaRepository";

export class GetMultasPendientesParaAprobar {
  constructor(private repo: IRegistroMultaRepository) {}

  async execute(userId: number) {
    return this.repo.getPendientesParaAprobar(userId);
  }
}

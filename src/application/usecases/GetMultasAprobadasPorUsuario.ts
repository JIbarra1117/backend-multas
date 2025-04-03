import { IRegistroMultaRepository } from "../../domain/repositories/IRegistroMultaRepository";

export class GetMultasAprobadasPorUsuario {
  constructor(private repo: IRegistroMultaRepository) {}

  async execute(userId: number) {
    return this.repo.getAprobadasPorUsuario(userId);
  }
}

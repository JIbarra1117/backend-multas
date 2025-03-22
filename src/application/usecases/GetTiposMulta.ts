import { IRegistroMultaRepository } from "../../domain/repositories/IRegistroMultaRepository";

export class GetTiposMulta {
  constructor(private multaRepository: IRegistroMultaRepository) {}

  async execute() {
    return await this.multaRepository.findAll();
  }
}

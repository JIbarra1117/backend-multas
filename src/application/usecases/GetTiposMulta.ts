import { IMultaRepository } from "../../domain/repositories/IMultaRepository";

export class GetTiposMulta {
  constructor(private multaRepository: IMultaRepository) {}

  async execute() {
    return await this.multaRepository.findAll();
  }
}

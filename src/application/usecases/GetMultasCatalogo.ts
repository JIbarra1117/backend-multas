import { IMultaCatalogoRepository } from "../../domain/repositories/IMultaCatalogoRepository";

export class GetMultasCatalogo {
  constructor(private multaRepo: IMultaCatalogoRepository) {}

  async execute() {
    return await this.multaRepo.findAll();
  }
}

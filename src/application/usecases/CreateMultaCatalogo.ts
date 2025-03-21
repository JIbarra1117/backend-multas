import { IMultaCatalogoRepository } from "../../domain/repositories/IMultaCatalogoRepository";

export class CreateMultaCatalogo {
  constructor(private multaRepo: IMultaCatalogoRepository) {}

  async execute(descripcion: string) {
    if (!descripcion) throw new Error("La descripción es obligatoria");
    return await this.multaRepo.create(descripcion);
  }
}

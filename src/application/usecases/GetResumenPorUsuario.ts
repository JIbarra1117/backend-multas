import { IRegistroMultaRepository } from "../../domain/repositories/IRegistroMultaRepository";

export class GetResumenPorUsuario {
  constructor(private registroMultaRepository: IRegistroMultaRepository) {}

  async execute() {
    return await this.registroMultaRepository.obtenerResumenPorUsuario();
  }
}

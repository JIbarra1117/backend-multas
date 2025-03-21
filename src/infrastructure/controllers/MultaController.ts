import { Request, Response } from "express";
import { MultaRepository } from "../../infrastructure/repositories/MultaRepository";
import { CreateMulta } from "../../application/usecases/CreateMulta";
import { ApproveMulta } from "../../application/usecases/ApproveMulta";
import { GetTiposMulta } from "../../application/usecases/GetTiposMulta";

const multaRepository = new MultaRepository();
const createMultaUseCase = new CreateMulta(multaRepository);
const approveMultaUseCase = new ApproveMulta(multaRepository);

export const createMulta = async (req: Request, res: Response) => {
  try {
    const { usuarioMultadoId, descripcion } = req.body;
    const usuarioAutorId = (req as any).user.id;
    await createMultaUseCase.execute(usuarioMultadoId, usuarioAutorId, descripcion);
    res.status(201).json({ message: "✅ Multa registrada correctamente" });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const approveMulta = async (req: Request, res: Response) => {
  try {
    const { multaId } = req.params;
    const usuarioId = (req as any).user.id;
    await approveMultaUseCase.execute(parseInt(multaId), usuarioId);
    res.status(200).json({ message: "✅ Multa aprobada correctamente" });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

const multaRepo = new MultaRepository();
const getTiposMulta = new GetTiposMulta(multaRepo);

export const listarTiposMulta = async (req: Request, res: Response) => {
  try {
    const tipos = await getTiposMulta.execute();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: "Error al listar tipos de multa" });
  }
};

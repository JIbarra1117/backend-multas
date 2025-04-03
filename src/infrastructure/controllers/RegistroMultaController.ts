import { Request, Response } from "express";
import { RegistroMultaRepository } from "../repositories/RegistroMultaRepository";
import { CreateMulta } from "../../application/usecases/CreateRegistroMulta";
import { ApproveMulta } from "../../application/usecases/ApproveMulta";
import { GetTiposMulta } from "../../application/usecases/GetTiposMulta";
import { GetResumenPorUsuario } from "../../application/usecases/GetResumenPorUsuario";
import { GetMultasPendientesParaAprobar } from "../../application/usecases/GetMultasPendientesParaAprobar";
import { GetMultasAprobadasPorUsuario } from "../../application/usecases/GetMultasAprobadasPorUsuario";

const multaRepository = new RegistroMultaRepository();
const createMultaUseCase = new CreateMulta(multaRepository);
const approveMultaUseCase = new ApproveMulta(multaRepository);

export const createRegistroMulta = async (req: Request, res: Response) => {
  try {
    const { multaId, usuarioMultadoId, descripcion } = req.body;
    const usuarioAutorId = (req as any).user.id;
    await createMultaUseCase.execute(multaId, usuarioMultadoId, usuarioAutorId, descripcion);
    res.status(201).json({ message: "✅ Multa registrada correctamente" });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const approveRegistroMulta = async (req: Request, res: Response) => {
  try {
    // Se obtiene el id de la multa de los parámetros de la URL
    const { multaId } = req.params;
    // Se obtiene el usuario del middleware de autenticación
    const usuarioId = (req as any).user.id;
    await approveMultaUseCase.execute(parseInt(multaId), usuarioId);
    res.status(200).json({ message: "✅ Multa aprobada correctamente" });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

const multaRepo = new RegistroMultaRepository();
const getRegistroMulta = new GetTiposMulta(multaRepo);

export const listarRegistroMultas = async (req: Request, res: Response) => {
  try {
    const tipos = await getRegistroMulta.execute();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: "Error al listar tipos de multa" });
  }
};

const getResumenPorUsuarioUseCase = new GetResumenPorUsuario(multaRepo);

export const getResumenPorUsuario = async (req: Request, res: Response) => {
  try {
    const resumen = await getResumenPorUsuarioUseCase.execute();
    res.json(resumen);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener resumen" });
  }
};

export const getPendientesParaAprobar = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const usecase = new GetMultasPendientesParaAprobar(new RegistroMultaRepository());

  try {
    const multas = await usecase.execute(userId);
    res.json(multas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener multas pendientes" });
  }
};

export const getAprobadasPorUsuario = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const usecase = new GetMultasAprobadasPorUsuario(new RegistroMultaRepository());

  try {
    const multas = await usecase.execute(userId);
    res.json(multas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener multas aprobadas por usuario" });
  }
};

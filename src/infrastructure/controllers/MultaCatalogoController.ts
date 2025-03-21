import { Request, Response } from "express";
import { MultaCatalogoRepository } from "../repositories/MultaCatalogoRepository";
import { GetMultasCatalogo } from "../../application/usecases/GetMultasCatalogo";
import { CreateMultaCatalogo } from "../../application/usecases/CreateMultaCatalogo";

const multaRepo = new MultaCatalogoRepository();
const getMultas = new GetMultasCatalogo(multaRepo);
const createMulta = new CreateMultaCatalogo(multaRepo);

export const listarMultas = async (req: Request, res: Response) => {
  try {
    const multas = await getMultas.execute();
    res.json(multas);
  } catch (error) {
    res.status(500).json({ error: "Error al listar multas" });
  }
};

export const crearMulta = async (req: Request, res: Response) => {
  try {
    const { descripcion } = req.body;
    const nuevaMulta = await createMulta.execute(descripcion);
    res.status(201).json(nuevaMulta);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
};

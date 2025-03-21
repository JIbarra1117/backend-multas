import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { GetAllUsers } from "../../application/usecases/GetAllUsers";

const userRepository = new UserRepository();
const getAllUsers = new GetAllUsers(userRepository);

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers.execute();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

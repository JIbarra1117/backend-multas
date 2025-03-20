import { Request, Response } from "express";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { AuthenticateUser } from "../../application/usecases/AuthenticateUser";
import { RegisterUser } from "../../application/usecases/RegisterUser";

const userRepository = new UserRepository();
const authenticateUser = new AuthenticateUser(userRepository);
const registerUser = new RegisterUser(userRepository);

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await authenticateUser.execute(email, password);
    res.json({ token });
  } catch (error) {
    const err = error as Error;
    res.status(401).json({ error: err.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password, rol } = req.body;
    await registerUser.execute(nombre, email, password, rol);
    res.status(201).json({ message: "✅ Usuario registrado correctamente" });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
};
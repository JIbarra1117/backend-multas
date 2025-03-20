import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "❌ Acceso no autorizado" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next(); // ✅ Ahora Express puede continuar al siguiente middleware/controlador
  } catch (error) {
    res.status(401).json({ error: "❌ Token inválido" });
  }
};

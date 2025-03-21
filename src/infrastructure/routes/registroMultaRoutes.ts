import express from 'express';
import { createRegistroMulta, approveRegistroMulta } from '../controllers/MultaController';
import { authMiddleware } from '../middleware/authMiddleware';
import { listarRegistroMultas } from "../controllers/MultaController";

const router = express.Router();

// Ruta para registrar una multa (requiere autenticación)
router.post('/create', authMiddleware, createRegistroMulta);

// Ruta para aprobar una multa (requiere autenticación)
router.post('/approve/:multaId', authMiddleware, approveRegistroMulta);

// Ruta para obtener las RegistroMultas
router.get("/", authMiddleware, listarRegistroMultas);

export default router;
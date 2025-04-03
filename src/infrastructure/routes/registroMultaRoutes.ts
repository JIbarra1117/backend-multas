import express from 'express';
import { createRegistroMulta, approveRegistroMulta, getResumenPorUsuario, getPendientesParaAprobar, getAprobadasPorUsuario } from '../controllers/RegistroMultaController';
import { authMiddleware } from '../middleware/authMiddleware';
import { listarRegistroMultas } from "../controllers/RegistroMultaController";

const router = express.Router();

// Ruta para registrar una multa (requiere autenticación)
router.post('/create', authMiddleware, createRegistroMulta);

// Ruta para aprobar una multa (requiere autenticación)
router.post('/approve/:multaId', authMiddleware, approveRegistroMulta);

// Ruta para obtener las RegistroMultas
router.get("/", authMiddleware, listarRegistroMultas);

// Ruta para obtener historial de multas por usuario
router.get("/resumen-por-usuario", authMiddleware, getResumenPorUsuario);

// Ruta para obtener historial de multas pendientes por aprobar
router.get('/pendientes/:userId', authMiddleware, getPendientesParaAprobar);

// Ruta para obtener historial de multas aprobadas
router.get('/aprobadas/:userId', authMiddleware, getAprobadasPorUsuario);

export default router;
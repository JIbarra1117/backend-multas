import express from 'express';
import { createMulta, approveMulta } from '../controllers/MultaController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Ruta para registrar una multa (requiere autenticación)
router.post('/create', authMiddleware, createMulta);

// Ruta para aprobar una multa (requiere autenticación)
router.post('/approve/:multaId', authMiddleware, approveMulta);

export default router;
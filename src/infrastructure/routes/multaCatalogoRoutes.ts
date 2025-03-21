import express from "express";
import {
  listarMultas,
  crearMulta,
} from "../controllers/MultaCatalogoController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, listarMultas);
router.post("/", authMiddleware, crearMulta);

export default router;

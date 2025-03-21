import express from "express";
import { listUsers } from "../controllers/UserController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, listUsers);

export default router;

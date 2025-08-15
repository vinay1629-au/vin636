import { Router } from "express";
import { createOffense, getOffenses, getOffense, updateOffense, deleteOffense } from "../controllers/offenseController.js";

const router = Router();
router.post("/", createOffense);
router.get("/", getOffenses);
router.get("/:id", getOffense);
router.put("/:id", updateOffense);
router.delete("/:id", deleteOffense);

export default router; // <- important

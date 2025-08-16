import { Router } from "express";
import auth from "../middleware/auth.js";
import Offense from "../models/offense.js";

const router = Router();

// Protect ALL offense routes with JWT
router.use(auth);

// CREATE
router.post("/", async (req, res) => {
  try {
    const o = await Offense.create(req.body);
    res.status(201).json(o);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// READ (list)
router.get("/", async (_req, res) => {
  try {
    const list = await Offense.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Offense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const gone = await Offense.findByIdAndDelete(req.params.id);
    if (!gone) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
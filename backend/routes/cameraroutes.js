import { Router } from "express";
import auth from "../middleware/auth.js";
import Camera from "../models/camera.js";

const router = Router();
router.use(auth);

// CREATE
router.post("/", async (req, res) => {
  try { const doc = await Camera.create(req.body); res.status(201).json(doc); }
  catch (e) { res.status(400).json({ error: e.message }); }
});

// READ
router.get("/", async (_req, res) => {
  try { const docs = await Camera.find().sort({ createdAt: -1 }); res.json(docs); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const doc = await Camera.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const gone = await Camera.findByIdAndDelete(req.params.id);
    if (!gone) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

export default router;
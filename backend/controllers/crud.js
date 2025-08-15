import mongoose from "mongoose";
const okId = (id) => mongoose.Types.ObjectId.isValid(id);

export const makeCrud = (Model) => ({
  create: async (req, res) => {
    try { const doc = await Model.create(req.body); return res.status(201).json(doc); }
    catch (e) { return res.status(400).json({ error: e.message }); }
  },
  list: async (_req, res) => {
    try { const docs = await Model.find().sort({ createdAt: -1 }); return res.json(docs); }
    catch (e) { return res.status(500).json({ error: e.message }); }
  },
  getOne: async (req, res) => {
    try {
      if (!okId(req.params.id)) return res.status(400).json({ error: "Invalid ID" });
      const doc = await Model.findById(req.params.id);
      if (!doc) return res.status(404).json({ error: "Not found" });
      return res.json(doc);
    } catch (e) { return res.status(500).json({ error: e.message }); }
  },
  update: async (req, res) => {
    try {
      if (!okId(req.params.id)) return res.status(400).json({ error: "Invalid ID" });
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!doc) return res.status(404).json({ error: "Not found" });
      return res.json(doc);
    } catch (e) { return res.status(400).json({ error: e.message }); }
  },
  remove: async (req, res) => {
    try {
      if (!okId(req.params.id)) return res.status(400).json({ error: "Invalid ID" });
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ error: "Not found" });
      return res.json({ ok: true });
    } catch (e) { return res.status(500).json({ error: e.message }); }
  }
});

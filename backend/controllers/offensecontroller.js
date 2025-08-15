import Offense from "../models/offense.js";

export const createOffense = async (req, res) => {
  try {
    const doc = await Offense.create(req.body);
    res.status(201).json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const getOffenses = async (_req, res) => {
  const docs = await Offense.find().sort({ createdAt: -1 });
  res.json(docs);
};

export const getOffense = async (req, res) => {
  const doc = await Offense.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: "Not found" });
  res.json(doc);
};

export const updateOffense = async (req, res) => {
  const doc = await Offense.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.status(404).json({ error: "Not found" });
  res.json(doc);
};

export const deleteOffense = async (req, res) => {
  const doc = await Offense.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
};

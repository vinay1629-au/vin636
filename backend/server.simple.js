import express from "express";
import cors from "cors";

const app = express();
app.use(cors({ origin: "*" }));
app.get("/health", (_req, res) => res.json({ ok: true, simple: true }));

const PORT = 4000;
app.listen(PORT, "127.0.0.1", () => console.log(`🧪 Simple server on ${PORT}`));
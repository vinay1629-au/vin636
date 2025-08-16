import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import offenseRoutes from "./routes/offenseRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
mongoose.set("strictQuery", false);

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

// health check
app.get("/health", (_req, res) => res.json({ ok: true }));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/offenses", offenseRoutes);

const PORT = Number(process.env.PORT) || 4000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ Missing MONGO_URI in backend/.env");
  process.exit(1);
}

mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 20000 })
  .then(() => {
    console.log("✅ Mongo connected");
    app.listen(PORT, () => console.log(`🚀 Server on ${PORT}`));
  })
  .catch(err => {
    console.error("❌ Startup error:", err.message);
    process.exit(1);
  });
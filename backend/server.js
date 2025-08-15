// backend/server.js (ESM)
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// ✅ keep ONLY ONE import, and make sure the filename matches your routes file
import offenseRoutes from "./routes/offenseRoutes.js";

dotenv.config();
mongoose.set("strictQuery", false);

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

// health first
app.get("/health", (_req, res) => res.json({ ok: true }));

const PORT = Number(process.env.PORT) || 4000;
const MONGO_URI = process.env.MONGO_URI;

async function start() {
  try {
    if (!MONGO_URI) {
      console.error("❌ Missing MONGO_URI in backend/.env");
      process.exit(1);
    }

    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 15000 });
    console.log("✅ Mongo connected");

    // ✅ mount ONCE
    app.use("/api/offenses", offenseRoutes);

    app.listen(PORT, () => console.log(`🚀 Server on ${PORT}`));
  } catch (err) {
    console.error("❌ Startup error:", err.message);
    process.exit(1);
  }
}

start();

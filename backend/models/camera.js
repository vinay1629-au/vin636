import mongoose from "mongoose";

const cameraSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, trim: true },
  location: { type: String, required: true, trim: true },
  status: { type: String, enum: ["active", "offline", "maintenance"], default: "active" },
  installedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Camera", cameraSchema);
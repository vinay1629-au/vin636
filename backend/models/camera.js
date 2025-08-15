import mongoose from "mongoose";
const schema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, trim: true },
  location: { type: String, required: true },
  status: { type: String, enum: ["active","inactive"], default: "active" }
}, { timestamps: true });
export default mongoose.model("Camera", schema);

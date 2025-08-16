import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  plate: { type: String, required: true, unique: true, uppercase: true, trim: true },
  ownerName: { type: String, required: true, trim: true },
  make: { type: String, trim: true },
  model: { type: String, trim: true },
  color: { type: String, trim: true }
}, { timestamps: true });

export default mongoose.model("Vehicle", vehicleSchema);
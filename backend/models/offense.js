import mongoose from "mongoose";

const offenseSchema = new mongoose.Schema(
  {
    licensePlate: { type: String, required: true, trim: true },
    violationType: { type: String, required: true, enum: ["Speeding", "Signal Jump", "Other"] },
    location: { type: String, default: "" },
    fineAmount: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("Offense", offenseSchema);
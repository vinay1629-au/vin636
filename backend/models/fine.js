import mongoose from "mongoose";

const fineSchema = new mongoose.Schema({
  offenseId: { type: mongoose.Schema.Types.ObjectId, ref: "Offense", required: true },
  amount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ["unpaid", "paid", "cancelled"], default: "unpaid" },
  issuedAt: { type: Date, default: Date.now },
  paidAt: { type: Date },
  notes: { type: String, trim: true }
}, { timestamps: true });

export default mongoose.model("Fine", fineSchema);
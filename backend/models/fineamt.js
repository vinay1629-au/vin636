import mongoose from "mongoose";
const schema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  offenseRef: { type: mongoose.Schema.Types.ObjectId, ref: "Offense", required: true },
  driverRef: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  vehicleRef: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  amount: { type: Number, required: true, min: 0 },
  dueDate: { type: Date, required: true },
  paid: { type: Boolean, default: false }
}, { timestamps: true });
export default mongoose.model("Fine", schema);

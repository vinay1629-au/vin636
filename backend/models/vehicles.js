import mongoose from "mongoose";
const schema = new mongoose.Schema({
  plateNumber: { type: String, required: true, unique: true, trim: true },
  make: String, model: String, color: String
}, { timestamps: true });
export default mongoose.model("Vehicle", schema);

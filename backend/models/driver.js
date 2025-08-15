import mongoose from "mongoose";
const schema = new mongoose.Schema({
  licenseNo: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true },
  contact: String, address: String
}, { timestamps: true });
export default mongoose.model("Driver", schema);

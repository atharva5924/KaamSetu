import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
  districtName: { type: String, required: true, unique: true },
  stateName: { type: String, required: true },
  latitude: Number,
  longitude: Number,
  population: Number,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

const District = mongoose.model("District", districtSchema);

export default District;

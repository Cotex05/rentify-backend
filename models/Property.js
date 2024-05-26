// models/Property.js
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  place: String,
  area: Number,
  bedrooms: Number,
  bathrooms: Number,
  cost: Number,
  amenities: [String],
  nearby: [String],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Property", propertySchema);

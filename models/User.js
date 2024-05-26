// models/User.js
import mongoose from "mongoose";

// Define User schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  password: String,
});

export default mongoose.model("User", userSchema);

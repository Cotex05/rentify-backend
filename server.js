import express from "express";
import mongoose from "mongoose";

import propertyRoutes from "./routes/propertyRoutes.js";
import authenticationRoutes from "./routes/authenticationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// MongoDB connection URI
const uri = process.env.MONGODB_URI;
// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Routes
app.use("/auth", authenticationRoutes);
app.use("/properties", propertyRoutes);
app.use("/users", userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

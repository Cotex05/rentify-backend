// routes/propertyRoutes.js
import express from "express";

const router = express.Router();
import Property from "../models/Property.js";

// POST a new property
router.post("/add", async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all rental properties
router.get("/all", async (req, res) => {
  try {
    const properties = await Property.find().populate("seller");
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a property by ID
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: "property not found" });
    }
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all properties of a seller
router.get("/seller/:sellerId", async (req, res) => {
  try {
    const properties = await Property.find({ seller: req.params.sellerId });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update a property
router.put("/:id", async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a property
router.delete("/:id", async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;

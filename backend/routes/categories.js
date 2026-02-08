import express from "express";
import path from "path";
import fs from "fs/promises";
import Joi from "joi";
import { requireAuth } from "../middlewares/auth.js";
import Category from "../models/Category.js";
import Item from "../models/Item.js";
import { uploadCategoryIcon } from "../middlewares/uploadCategoryIcon.js";

const router = express.Router();

// Helper: delete icon file
async function deleteFile(filename) {
  if (!filename) return;
  try {
    const filePath = path.join(process.cwd(), "uploads/icons", filename);
    await fs.unlink(filePath);
    console.log("Deleted file:", filePath);
  } catch (err) {
    console.warn("Failed to delete file:", filename, err.message);
  }
}

// Input validation schema
const categorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  sortOrder: Joi.number().integer().optional(),
  isActive: Joi.boolean().optional(),
});

// GET ALL CATEGORIES
router.get("/", async (req, res) => {
  try {
    const dbName = Category.db.databaseName;
    const collectionName = Category.collection.name;
    console.log(`📊 Querying database: ${dbName}, collection: ${collectionName}`);
    
    const totalCount = await Category.countDocuments();
    console.log(`📊 Total categories in collection: ${totalCount}`);
    
    const categories = await Category.find().sort({ sortOrder: 1 });
    console.log(`✅ Fetched ${categories.length} categories`);
    
    if (categories.length < totalCount) {
      console.warn(`⚠️ Warning: Found ${totalCount} total categories but only ${categories.length} returned`);
    }
    
    res.json({ ok: true, data: categories });
  } catch (err) {
    console.error("Fetch categories error:", err);
    res.status(500).json({ ok: false, message: "Failed to fetch categories" });
  }
});

// CREATE CATEGORY (Admin only)
router.post(
  "/",
  requireAuth(true), // pass `true` for admin-only
  uploadCategoryIcon.single("icon"),
  async (req, res) => {
    try {
      const { error, value } = categorySchema.validate(req.body);
      if (error) return res.status(400).json({ ok: false, message: error.details[0].message });

      const existing = await Category.findOne({ name: value.name });
      if (existing) return res.status(409).json({ ok: false, message: "Category already exists" });

      const icon = req.file ? req.file.filename : null;

      const category = await Category.create({ ...value, icon });
      res.json({ ok: true, data: category });
    } catch (err) {
      console.error("Create category error:", err);
      res.status(500).json({ ok: false, message: "Failed to create category" });
    }
  }
);

// UPDATE CATEGORY (Admin only)
router.put(
  "/:id",
  requireAuth(true),
  uploadCategoryIcon.single("icon"),
  async (req, res) => {
    try {
      const { error, value } = categorySchema.validate(req.body, { allowUnknown: true });
      if (error) return res.status(400).json({ ok: false, message: error.details[0].message });

      const category = await Category.findById(req.params.id);
      if (!category) return res.status(404).json({ ok: false, message: "Category not found" });

      if (req.file && category.icon) await deleteFile(category.icon);

      if (req.file) value.icon = req.file.filename;

      const updated = await Category.findByIdAndUpdate(req.params.id, value, { new: true });
      res.json({ ok: true, data: updated });
    } catch (err) {
      console.error("Update category error:", err);
      res.status(500).json({ ok: false, message: "Failed to update category" });
    }
  }
);

// DELETE CATEGORY (Admin only)
router.delete("/:id", requireAuth(true), async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ ok: false, message: "Category not found" });

    if (category.icon) await deleteFile(category.icon);

    await Item.updateMany({ category: req.params.id }, { $set: { category: null } });
    await Category.findByIdAndDelete(req.params.id);

    res.json({ ok: true, message: "Category deleted" });
  } catch (err) {
    console.error("Delete category error:", err);
    res.status(500).json({ ok: false, message: "Failed to delete category" });
  }
});

export default router;

import express from "express";
import path from "path";
import fs from "fs/promises";
import { requireAuth } from "../middlewares/auth.js";
import Category from "../models/Category.js";
import Item from "../models/Item.js";
import { uploadCategoryIcon } from "../middlewares/uploadCategoryIcon.js";

const router = express.Router();

// Delete file helper
async function deleteFile(filename) {
  if (!filename) return;
  try {
    const filePath = path.join(process.cwd(), "uploads", "icons", filename);
    await fs.unlink(filePath);
    console.log("Deleted file:", filePath);
  } catch (err) {
    console.warn("Failed to delete file:", filename, err.message);
  }
}

// GET ALL CATEGORIES
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ sortOrder: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

// CREATE CATEGORY
router.post(
  "/",
  requireAuth,
  uploadCategoryIcon.single("icon"),
  async (req, res) => {
    try {
      const { name, sortOrder, isActive } = req.body;

      if (!name || !name.trim()) {
        return res.status(400).json({ message: "Category name is required" });
      }

      const icon = req.file ? req.file.filename : null;

      const doc = await Category.create({
        name: name.trim(),
        sortOrder,
        isActive,
        icon,
      });

      res.json(doc);
    } catch (err) {
      console.error("Create category error:", err);
      res.status(500).json({ message: "Failed to create category" });
    }
  }
);

// UPDATE CATEGORY
router.put(
  "/:id",
  requireAuth,
  uploadCategoryIcon.single("icon"),
  async (req, res) => {
    try {
      const oldCategory = await Category.findById(req.params.id);
      if (!oldCategory) return res.status(404).json({ message: "Not found" });

      const updateData = { ...req.body };

      if (req.file) {
        if (oldCategory.icon) await deleteFile(oldCategory.icon);
        updateData.icon = req.file.filename;
      }

      const updated = await Category.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.json(updated);
    } catch (err) {
      console.error("Update category error:", err);
      res.status(500).json({ message: "Failed to update category" });
    }
  }
);

// DELETE CATEGORY
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Not found" });

    if (category.icon) await deleteFile(category.icon);

    await Item.updateMany({ category: req.params.id }, { $set: { category: null } });

    await Category.findByIdAndDelete(req.params.id);

    res.json({ ok: true });
  } catch (err) {
    console.error("Delete category error:", err);
    res.status(500).json({ message: "Failed to delete category" });
  }
});

export default router;

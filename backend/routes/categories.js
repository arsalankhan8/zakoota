import express from "express";
import Joi from "joi";
import { requireAuth } from "../middlewares/auth.js";
import Category from "../models/Category.js";
import Item from "../models/Item.js";
import { uploadCategoryIcon } from "../middlewares/uploadCategoryIcon.js";
import {
  uploadBuffer,
  deleteByPublicId,
  getPublicIdFromUrl,
} from "../config/cloudinary.js";

const router = express.Router();

// Input validation schema
const categorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  sortOrder: Joi.number().integer().optional(),
  isActive: Joi.boolean().optional(),
});

// GET ALL CATEGORIES
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ sortOrder: 1 });
    res.json({ ok: true, data: categories });
  } catch (err) {
    console.error("Fetch categories error:", err);
    res.status(500).json({ ok: false, message: "Failed to fetch categories" });
  }
});

// CREATE CATEGORY (Admin only) – icon uploaded to Cloudinary, URL stored in DB
router.post(
  "/",
  requireAuth(true),
  uploadCategoryIcon.single("icon"),
  async (req, res) => {
    try {
      const { error, value } = categorySchema.validate(req.body);
      if (error) return res.status(400).json({ ok: false, message: error.details[0].message });

      const existing = await Category.findOne({ name: value.name });
      if (existing) return res.status(409).json({ ok: false, message: "Category already exists" });

      let icon = null;
      if (req.file && req.file.buffer) {
        const { url } = await uploadBuffer(req.file.buffer, req.file.mimetype, {
          folder: "zakoota/icons",
        });
        icon = url;
      }

      const category = await Category.create({ ...value, icon });
      res.json({ ok: true, data: category });
    } catch (err) {
      console.error("Create category error:", err);
      res.status(500).json({
        ok: false,
        message: err.message || "Failed to create category",
      });
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

      // If new icon uploaded, delete old one from Cloudinary (if it was a Cloudinary URL) and set new URL
      if (req.file && req.file.buffer) {
        const oldIcon = category.icon;
        const publicId = getPublicIdFromUrl(oldIcon);
        if (publicId) {
          deleteByPublicId(publicId).catch((e) =>
            console.warn("Cloudinary delete old icon:", e.message)
          );
        }
        const { url } = await uploadBuffer(req.file.buffer, req.file.mimetype, {
          folder: "zakoota/icons",
        });
        value.icon = url;
      }

      const updated = await Category.findByIdAndUpdate(req.params.id, value, { new: true });
      res.json({ ok: true, data: updated });
    } catch (err) {
      console.error("Update category error:", err);
      res.status(500).json({
        ok: false,
        message: err.message || "Failed to update category",
      });
    }
  }
);

// DELETE CATEGORY (Admin only)
router.delete("/:id", requireAuth(true), async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ ok: false, message: "Category not found" });

    if (category.icon) {
      const publicId = getPublicIdFromUrl(category.icon);
      if (publicId) {
        deleteByPublicId(publicId).catch((e) =>
          console.warn("Cloudinary delete category icon:", e.message)
        );
      }
    }

    await Item.updateMany({ category: req.params.id }, { $set: { category: null } });
    await Category.findByIdAndDelete(req.params.id);

    res.json({ ok: true, message: "Category deleted" });
  } catch (err) {
    console.error("Delete category error:", err);
    res.status(500).json({ ok: false, message: "Failed to delete category" });
  }
});

export default router;

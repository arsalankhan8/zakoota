import express from "express";
import Joi from "joi";
import { requireAuth } from "../middlewares/auth.js";
import Item from "../models/Item.js";
import { uploadItemImage } from "../middlewares/upload.js";
import {
  uploadBuffer,
  deleteByPublicId,
  getPublicIdFromUrl,
} from "../config/cloudinary.js";

const router = express.Router();

// Input validation schema
const itemSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  description: Joi.string().trim().allow("").optional(),
  prices: Joi.array()
    .items(
      Joi.object({
        label: Joi.string().allow("").optional(),
        amount: Joi.number().min(0).required(),
      })
    )
    .optional()
    .default([]),
  category: Joi.string().allow(null, "").optional(),
  isLive: Joi.boolean().optional(),
  isBestSeller: Joi.boolean().optional(),
  imageUrl: Joi.string().allow("").optional(),
  externalUrl: Joi.string().allow("").optional(),
});

// DELETE uploaded image (Cloudinary) – call when user cancels without saving
router.delete("/upload", requireAuth(true), async (req, res) => {
  try {
    const publicId = req.query.publicId;
    if (!publicId || typeof publicId !== "string") {
      return res.status(400).json({ ok: false, message: "Missing or invalid publicId" });
    }
    // Optional: ensure publicId is for our app (e.g. starts with zakoota/)
    await deleteByPublicId(publicId);
    res.json({ ok: true });
  } catch (err) {
    console.error("Delete upload error:", err);
    res.status(500).json({ ok: false, message: "Failed to delete file" });
  }
});

// UPLOAD image to Cloudinary
router.post(
  "/upload",
  requireAuth(true),
  uploadItemImage.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ ok: false, message: "No file uploaded" });
      }

      const { url, publicId } = await uploadBuffer(req.file.buffer, req.file.mimetype, {
        folder: "zakoota/items",
      });

      res.json({
        ok: true,
        data: {
          imageUrl: url,
          publicId,
          fileKey: publicId, // legacy: frontend may still use fileKey for delete
        },
      });
    } catch (err) {
      console.error("Upload image error:", err);
      res.status(500).json({
        ok: false,
        message: err.message || "Failed to upload file",
      });
    }
  }
);

// GET public items
router.get("/public", async (req, res) => {
  try {
    const items = await Item.find({ isLive: true })
      .populate("category", "name icon")
      .sort({ createdAt: -1 });
    res.json({ ok: true, data: items });
  } catch (err) {
    console.error("Fetch public items error:", err);
    res.status(500).json({ ok: false, message: "Failed to fetch items" });
  }
});

// ADMIN CRUD
router.get("/", requireAuth(true), async (req, res) => {
  try {
    const totalCount = await Item.countDocuments();
    const items = await Item.find()
      .populate("category", "name icon")
      .sort({ createdAt: -1 });
    res.json({ ok: true, data: items });
  } catch (err) {
    console.error("Fetch items error:", err);
    res.status(500).json({ ok: false, message: "Failed to fetch items" });
  }
});

router.post("/", requireAuth(true), async (req, res) => {
  try {
    const { error, value } = itemSchema.validate(req.body);
    if (error) return res.status(400).json({ ok: false, message: error.details[0].message });

    if (value.category === "") value.category = null;

    const item = await Item.create(value);
    res.json({ ok: true, data: item });
  } catch (err) {
    console.error("Create item error:", err);
    res.status(500).json({ ok: false, message: "Failed to create item" });
  }
});

router.put("/:id", requireAuth(true), async (req, res) => {
  try {
    const { error, value } = itemSchema.validate(req.body, { allowUnknown: true });
    if (error) return res.status(400).json({ ok: false, message: error.details[0].message });

    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ ok: false, message: "Item not found" });

    if (value.category === "") value.category = null;

    const oldImg = item.imageUrl;
    const updated = await Item.findByIdAndUpdate(req.params.id, value, { new: true });

    // Optionally delete old image from Cloudinary if it was replaced and is a Cloudinary URL
    const newImg = value.imageUrl;
    if (oldImg && oldImg !== newImg) {
      const publicId = getPublicIdFromUrl(oldImg);
      if (publicId) {
        deleteByPublicId(publicId).catch((e) =>
          console.warn("Cloudinary delete old image:", e.message)
        );
      }
    }

    res.json({ ok: true, data: updated });
  } catch (err) {
    console.error("Update item error:", err);
    res.status(500).json({ ok: false, message: "Failed to update item" });
  }
});

router.delete("/:id", requireAuth(true), async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ ok: false, message: "Item not found" });

    await Item.findByIdAndDelete(req.params.id);

    // Delete image from Cloudinary if it's a Cloudinary URL
    if (item.imageUrl) {
      const publicId = getPublicIdFromUrl(item.imageUrl);
      if (publicId) {
        deleteByPublicId(publicId).catch((e) =>
          console.warn("Cloudinary delete item image:", e.message)
        );
      }
    }

    res.json({ ok: true, message: "Item deleted" });
  } catch (err) {
    console.error("Delete item error:", err);
    res.status(500).json({ ok: false, message: "Failed to delete item" });
  }
});

export default router;

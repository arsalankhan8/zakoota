import express from "express";
import fs from "fs/promises";
import path from "path";
import Joi from "joi";
import { requireAuth } from "../middlewares/auth.js";
import Item from "../models/Item.js";
import { uploadItemImage } from "../middlewares/upload.js";

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

// Delete file helper
async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log("Deleted file:", filePath);
  } catch (err) {
    if (err.code !== "ENOENT") console.warn("Failed to delete file:", filePath, err.message);
  }
}

// DELETE uploaded image
router.delete("/upload/:fileKey", requireAuth(true), async (req, res) => {
  try {
    const { fileKey } = req.params;
    if (!fileKey || fileKey.includes("..") || fileKey.includes("/") || fileKey.includes("\\")) {
      return res.status(400).json({ ok: false, message: "Invalid fileKey" });
    }

    const filePath = path.join(process.cwd(), "uploads/items", fileKey);
    await deleteFile(filePath);
    res.json({ ok: true });
  } catch (err) {
    console.error("Delete upload error:", err);
    res.status(500).json({ ok: false, message: "Failed to delete file" });
  }
});

// UPLOAD image
router.post("/upload", requireAuth(true), uploadItemImage.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ ok: false, message: "No file uploaded" });

    const fileKey = req.file.filename;
    const imageUrl = `/uploads/items/${fileKey}`;
    res.json({ ok: true, data: { fileKey, imageUrl } });
  } catch (err) {
    console.error("Upload image error:", err);
    res.status(500).json({ ok: false, message: "Failed to upload file" });
  }
});

// GET public items
router.get("/public", async (req, res) => {
  try {
    const items = await Item.find({ isLive: true }).populate("category", "name icon").sort({ createdAt: -1 });
    res.json({ ok: true, data: items });
  } catch (err) {
    console.error("Fetch public items error:", err);
    res.status(500).json({ ok: false, message: "Failed to fetch items" });
  }
});

// ADMIN CRUD
router.get("/", requireAuth(true), async (req, res) => {
  try {
    const dbName = Item.db.databaseName;
    const collectionName = Item.collection.name;
    console.log(`📊 Querying database: ${dbName}, collection: ${collectionName}`);
    
    const totalCount = await Item.countDocuments();
    console.log(`📊 Total items in collection: ${totalCount}`);
    
    const items = await Item.find().populate("category", "name icon").sort({ createdAt: -1 });
    console.log(`✅ Fetched ${items.length} items for admin`);
    
    if (items.length < totalCount) {
      console.warn(`⚠️ Warning: Found ${totalCount} total items but only ${items.length} returned (might be populate issue)`);
    }
    
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

    // Normalize category: empty string to null
    if (value.category === "") {
      value.category = null;
    }

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

    // Normalize category: empty string to null
    if (value.category === "") {
      value.category = null;
    }

    const oldImg = item.imageUrl;
    const updated = await Item.findByIdAndUpdate(req.params.id, value, { new: true });

    // Delete old image if changed
    const newImg = value.imageUrl;
    if (oldImg && oldImg !== newImg && oldImg.startsWith("/uploads/items/")) {
      const filePath = path.join(process.cwd(), "uploads/items", oldImg.split("/uploads/items/")[1]);
      await deleteFile(filePath);
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

    if (item.imageUrl && item.imageUrl.startsWith("/uploads/items/")) {
      const filePath = path.join(process.cwd(), "uploads/items", item.imageUrl.split("/uploads/items/")[1]);
      await deleteFile(filePath);
    }

    res.json({ ok: true, message: "Item deleted" });
  } catch (err) {
    console.error("Delete item error:", err);
    res.status(500).json({ ok: false, message: "Failed to delete item" });
  }
});

export default router;

// routes > items.js
import fs from "fs";
import path from "path";
import express from "express";
import Item from "../models/Item.js";
import { requireAuth } from "../middlewares/auth.js";
import { uploadItemImage } from "../middlewares/upload.js";
const router = express.Router();

router.delete("/upload/:fileKey", requireAuth, async (req, res) => {
  try {
    const { fileKey } = req.params;

    // prevent path traversal
    if (
      !fileKey ||
      fileKey.includes("..") ||
      fileKey.includes("/") ||
      fileKey.includes("\\")
    ) {
      return res.status(400).json({ message: "Invalid fileKey" });
    }

    // ✅ same folder you used in multer: process.cwd() + /uploads/items
    const filePath = path.join(process.cwd(), "uploads", "items", fileKey);

    fs.unlink(filePath, (err) => {
      // already deleted = ok
      if (err && err.code !== "ENOENT") {
        return res.status(500).json({ message: "Failed to delete file" });
      }
      return res.json({ ok: true });
    });
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
});

// upload image
router.post(
  "/upload",
  requireAuth,
  uploadItemImage.single("image"),
  (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const fileKey = file.filename;
    const imageUrl = `/uploads/items/${fileKey}`;

    res.json({ imageUrl, fileKey });
  }
);

// public
router.get("/public", async (req, res) => {
  const items = await Item.find({ isLive: true })
    .populate("category", "name")
    .sort({ createdAt: -1 });
  res.json(items);
});

// admin
router.get("/", requireAuth, async (req, res) => {
  const items = await Item.find()
    .populate("category", "name")
    .sort({ createdAt: -1 });
  res.json(items);
});

router.post("/", requireAuth, async (req, res) => {
  const doc = await Item.create(req.body);
  res.json(doc);
});

router.put("/:id", requireAuth, async (req, res) => {
  const existing = await Item.findById(req.params.id);
  if (!existing) return res.status(404).json({ message: "Item not found" });

  const oldImg = existing.imageUrl;
  const newImg = req.body?.imageUrl;

  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  // if image changed, delete old file (only if it was local upload)
  const imageChanged = oldImg && oldImg !== newImg;

  if (imageChanged && oldImg.startsWith("/uploads/items/")) {
    const fileKey = oldImg.split("/uploads/items/")[1];
    const filePath = path.join(process.cwd(), "uploads", "items", fileKey);

    fs.unlink(filePath, (err) => {
      if (err && err.code !== "ENOENT") {
        console.log("❌ old image delete failed:", err.message);
      }
    });
  }

  res.json(updated);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });

  // delete DB first or after - both ok
  await Item.findByIdAndDelete(req.params.id);

  // delete file if local upload
  const img = item.imageUrl; // e.g. "/uploads/items/abc.png"
  if (img && img.startsWith("/uploads/items/")) {
    const fileKey = img.split("/uploads/items/")[1]; // abc.png
    const filePath = path.join(process.cwd(), "uploads", "items", fileKey);

    fs.unlink(filePath, (err) => {
      // ignore if already deleted
      if (err && err.code !== "ENOENT") {
        console.log("❌ image delete failed:", err.message);
      }
    });
  }

  return res.json({ ok: true });
});

export default router;

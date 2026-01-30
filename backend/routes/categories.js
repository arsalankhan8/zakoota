import express from "express";
import Category from "../models/Category.js";
import { requireAuth } from "../middlewares/auth.js";
import Item from "../models/Item.js";

const router = express.Router();

// public (for future website)
router.get("/public", async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort({ sortOrder: 1, createdAt: 1 });
  res.json(categories);
});

// admin
router.get("/", requireAuth, async (req, res) => {
  const categories = await Category.find().sort({ sortOrder: 1, createdAt: 1 });
  res.json(categories);
});

router.post("/", requireAuth, async (req, res) => {
  const { name, sortOrder = 0, isActive = true } = req.body;
  const doc = await Category.create({ name, sortOrder, isActive });
  res.json(doc);
});

router.put("/:id", requireAuth, async (req, res) => {
  const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const id = req.params.id;

  // 1) detach items
  const r = await Item.updateMany(
    { category: id },
    { $set: { category: null } }
  );

  // 2) delete category
  await Category.findByIdAndDelete(id);

  res.json({ ok: true, detachedItems: r.modifiedCount });
});
export default router;

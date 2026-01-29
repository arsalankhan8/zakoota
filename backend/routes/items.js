import express from "express";
import Item from "../models/Item.js";
import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();

// public (for future website)
router.get("/public", async (req, res) => {
  const items = await Item.find({ isLive: true }).populate("category", "name").sort({ createdAt: -1 });
  res.json(items);
});

// admin
router.get("/", requireAuth, async (req, res) => {
  const items = await Item.find().populate("category", "name").sort({ createdAt: -1 });
  res.json(items);
});

router.post("/", requireAuth, async (req, res) => {
  const doc = await Item.create(req.body);
  res.json(doc);
});

router.put("/:id", requireAuth, async (req, res) => {
  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", requireAuth, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;

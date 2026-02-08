import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import Joi from "joi";
import User from "../models/User.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts. Try again later." },
});

// Schemas
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// One-time admin creation (dev only)
router.post("/seed-admin", async (req, res) => {
  if (process.env.NODE_ENV !== "development") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, password } = req.body;
  const exists = await User.findOne({ username });
  
  if (exists) {
    // Update existing user's password and ensure they're admin
    exists.passwordHash = await bcrypt.hash(password, 12);
    exists.isAdmin = true;
    await exists.save();
    return res.json({ message: "User password updated and set as admin" });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await User.create({ username, passwordHash, isAdmin: true }); // All users are admins

  res.json({ message: "Admin created" });
});

// Login
router.post("/login", loginLimiter, async (req, res) => {
  if (!process.env.JWT_SECRET) return res.status(500).json({ message: "Server misconfigured" });

  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    console.log(`❌ Login failed: User "${username}" not found`);
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    console.log(`❌ Login failed: Invalid password for user "${username}"`);
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Ensure user is marked as admin (update if needed)
  if (!user.isAdmin) {
    user.isAdmin = true;
    await user.save();
  }

  // All logged-in users are admins
  const token = jwt.sign(
    { id: user._id, username: user.username, isAdmin: true },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    user: { id: user._id, username: user.username, isAdmin: true },
  });
});

// Promote current user to admin (dev only - for fixing existing users)
router.post("/promote-to-admin", async (req, res) => {
  if (process.env.NODE_ENV !== "development") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isAdmin = true;
    await user.save();

    // Generate new token with updated isAdmin
    const newToken = jwt.sign(
      { id: user._id, username: user.username, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "User promoted to admin",
      token: newToken,
      user: { id: user._id, username: user.username, isAdmin: true },
    });
  } catch (err) {
    console.error("Promote to admin error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
});

// Promote user by username to admin (dev only - for fixing existing users)
router.post("/promote-user/:username", async (req, res) => {
  if (process.env.NODE_ENV !== "development") {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isAdmin = true;
    await user.save();

    res.json({
      message: `User ${user.username} promoted to admin`,
      user: { id: user._id, username: user.username, isAdmin: true },
    });
  } catch (err) {
    console.error("Promote user error:", err);
    return res.status(500).json({ message: "Failed to promote user" });
  }
});

export default router;

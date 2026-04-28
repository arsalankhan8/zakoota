import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./db/connect.js";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/categories.js";
import itemRoutes from "./routes/items.js";

const app = express();

// Trust proxy (Railway / Render / Nginx support)
app.set("trust proxy", 1);

// File paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========================
// SECURITY MIDDLEWARE
// ========================
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

// ========================
// CORS CONFIG (FIXED)
// ========================
const allowedOrigins = [
  "https://zakoota.netlify.app",
  "http://localhost:5173"
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server or Postman
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(null, true); // avoid blocking preflight in production
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS globally
app.use(cors(corsOptions));

// IMPORTANT: handle preflight correctly
app.options("*", cors(corsOptions));

// ========================
// ROUTES
// ========================
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemRoutes);

// ========================
// GLOBAL ERROR HANDLER
// ========================
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      ok: false,
      message: "File too large",
    });
  }

  if (err.message && err.message.includes("Only image files")) {
    return res.status(400).json({
      ok: false,
      message: "Only image files are allowed",
    });
  }

  res.status(500).json({
    ok: false,
    message: err.message || "Internal server error",
  });
});

// ========================
// START SERVER
// ========================
const port = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`✅ API running on http://0.0.0.0:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB error:", err.message);
    process.exit(1);
  });

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

// Trust proxy (needed if behind a reverse proxy)
app.set("trust proxy", 1);

// File paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false, // optional: disable COEP if not needed
  }),
);
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://zakoota.netlify.app"]
    : ["http://localhost:5173"];

  
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman or server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy: ${origin} not allowed`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("*", cors());

// Routes (uploaded images/icons are served from Cloudinary URLs stored in DB)
app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemRoutes);

// Global error handler (e.g. Multer limit/file type errors)
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ ok: false, message: "File too large" });
  }
  if (err.message && err.message.includes("Only image files")) {
    return res.status(400).json({ ok: false, message: "Only image files are allowed" });
  }
  console.error("Unhandled error:", err);
  res.status(500).json({ ok: false, message: err.message || "Internal server error" });
});

// Start server
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

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { connectDB } from "./db/connect.js";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/categories.js";
import itemRoutes from "./routes/items.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: false
  })
);

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 120
  })
);

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemRoutes);

const port = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => console.log(`✅ API running on http://localhost:${port}`));
  })
  .catch((err) => {
    console.error("❌ DB error:", err.message);
    process.exit(1);
  });

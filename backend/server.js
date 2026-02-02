import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./db/connect.js";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/categories.js";
import itemRoutes from "./routes/items.js";

dotenv.config();

const app = express();

//  Add this if hosted behind proxy (safe to keep)
app.set("trust proxy", 1);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: false,
  })
);

app.get("/api/health", (req, res) => res.json({ ok: true }));

//  No rate limiters here
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemRoutes);

const port = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () =>
      console.log(`✅ API running on http://localhost:${port}`)
    );
  })
  .catch((err) => {
    console.error("❌ DB error:", err.message);
    process.exit(1);
  });

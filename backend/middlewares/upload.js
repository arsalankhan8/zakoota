import multer from "multer";
import path from "path";
import fs from "fs";

const itemsDir = path.join(process.cwd(), "uploads/items");
fs.mkdirSync(itemsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, itemsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "");
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, safeName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype?.startsWith("image/")) return cb(null, true);
  cb(new Error("Only image files are allowed"), false);
};

export const uploadItemImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

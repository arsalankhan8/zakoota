import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure folder exists
const iconsDir = path.join(process.cwd(), "uploads/icons");
fs.mkdirSync(iconsDir, { recursive: true });

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, iconsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "");
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, safeName);
  },
});

// Only allow images
const fileFilter = (req, file, cb) => {
  if (file.mimetype?.startsWith("image/")) return cb(null, true);
  cb(new Error("Only image files are allowed"), false);
};

// Export
export const uploadCategoryIcon = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

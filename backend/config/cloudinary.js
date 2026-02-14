import { v2 as cloudinary } from "cloudinary";

let configured = false;

/**
 * Configure Cloudinary from environment variables (called on first use).
 * Supports either CLOUDINARY_URL or individual CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET.
 */
function ensureConfigured() {
  if (configured) return;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (cloudName && apiKey && apiSecret) {
    cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
    configured = true;
    return;
  }
  if (process.env.CLOUDINARY_URL) {
    cloudinary.config({ url: process.env.CLOUDINARY_URL });
    configured = true;
    return;
  }
  throw new Error(
    "Missing Cloudinary config: set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET (or CLOUDINARY_URL)"
  );
}

/**
 * Upload a file buffer to Cloudinary.
 * @param {Buffer} buffer - File buffer from multer memory storage
 * @param {string} mimeType - e.g. "image/png"
 * @param {object} options - { folder: string }
 * @returns {Promise<{ url: string, publicId: string }>}
 */
export async function uploadBuffer(buffer, mimeType, options = {}) {
  ensureConfigured();
  if (!buffer || !Buffer.isBuffer(buffer)) {
    throw new Error("Invalid buffer");
  }
  const b64 = buffer.toString("base64");
  const dataUri = `data:${mimeType || "image/png"};base64,${b64}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: options.folder || "zakoota",
    resource_type: "image",
    ...options,
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

/**
 * Delete an asset from Cloudinary by public_id.
 * @param {string} publicId - Cloudinary public_id (e.g. "zakoota/items/xyz")
 * @returns {Promise<object>}
 */
export async function deleteByPublicId(publicId) {
  ensureConfigured();
  if (!publicId || typeof publicId !== "string") {
    throw new Error("Invalid publicId");
  }
  return cloudinary.uploader.destroy(publicId, { resource_type: "image" });
}

/**
 * Extract public_id from a Cloudinary secure_url (for legacy cleanup).
 * URL format: https://res.cloudinary.com/<cloud>/image/upload/v<version>/<public_id>.<ext>
 * @param {string} url
 * @returns {string|null}
 */
export function getPublicIdFromUrl(url) {
  if (!url || typeof url !== "string") return null;
  if (!url.includes("cloudinary.com")) return null;
  try {
    // URL format: .../upload/v123/folder/name.ext → public_id is "folder/name"
    const match = url.match(/\/upload\/v\d+\/(.+)\.(?:jpg|jpeg|png|gif|webp|svg)/i);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export { cloudinary };

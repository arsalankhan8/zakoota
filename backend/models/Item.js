// models/Item.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
      default: null,
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },

    prices: {
      small: { type: Number, default: 0 },
      medium: { type: Number, default: 0 },
      large: { type: Number, default: 0 },
    },

    imageUrl: { type: String, default: "" },
    isLive: { type: Boolean, default: true },
    isBestSeller: { type: Boolean, default: false },
    externalUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);

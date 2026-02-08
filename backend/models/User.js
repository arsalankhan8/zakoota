import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    passwordHash: { type: String, required: true },
    isAdmin: { type: Boolean, default: true }, // All users are admins
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

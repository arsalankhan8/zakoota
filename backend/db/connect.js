import mongoose from "mongoose";

export async function connectDB(uri) {
  if (!uri) throw new Error("MONGO_URI is missing in .env");

  // optional but nice
  mongoose.set("strictQuery", true);

  await mongoose.connect(uri, {
    // options are optional in modern mongoose, but safe
  });

  console.log("✅ MongoDB connected");
}

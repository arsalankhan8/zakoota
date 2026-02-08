import mongoose from "mongoose";

export const connectDB = async (mongoUri) => {
  if (!mongoUri) throw new Error("MONGO_URI is not defined");

  try {
    await mongoose.connect(mongoUri);
    const dbName = mongoose.connection.db.databaseName;
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`✅ MongoDB connected to database: ${dbName}`);
    console.log(`📊 Collections (${collections.length}): ${collections.map(c => `${c.name} (${c.type})`).join(", ")}`);
    
    // Log document counts for each collection
    for (const coll of collections) {
      try {
        const count = await mongoose.connection.db.collection(coll.name).countDocuments();
        console.log(`   - ${coll.name}: ${count} documents`);
      } catch (e) {
        console.log(`   - ${coll.name}: error counting`);
      }
    }
    
    // List all databases to help identify where data might be
    try {
      const adminDb = mongoose.connection.db.admin();
      const dbList = await adminDb.listDatabases();
      console.log(`\n📋 Available databases: ${dbList.databases.map(d => `${d.name} (${(d.sizeOnDisk/1024/1024).toFixed(2)}MB)`).join(", ")}`);
    } catch (e) {
      console.log("Could not list databases (may need admin privileges)");
    }
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    throw err; // pass error to the caller
  }
};

// Optional: listen to connection events
mongoose.connection.on("disconnected", () => console.warn("⚠️ MongoDB disconnected!"));
mongoose.connection.on("reconnected", () => console.log("🔄 MongoDB reconnected"));

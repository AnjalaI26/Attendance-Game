import db from "./db.js";

(async () => {
  try {
    await db;  
    console.log("✅ MongoDB connection test successful");
    process.exit(0);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
})();

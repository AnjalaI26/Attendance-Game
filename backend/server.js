import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./db.js";

// Import routes
import authRoutes from "./routes/auth.js";
import attendanceRoutes from "./routes/attendance.js";
import userRoutes from "./routes/users.js";
import itemRoutes from "./routes/items.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Attendance Game API is running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { PrismaClient } = require("@prisma/client");
const authRoutes = require("./routes/authRoutes"); // ✅ Correct path
app.use("/api/auth", authRoutes);

dotenv.config();
const prisma = new PrismaClient();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // Logs HTTP requests
app.use(cookieParser()); // Parses cookies for authentication

// Routes
const userRoutes = require("./routes/userRoutes");
const ngoRoutes = require("./routes/ngoRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/users", userRoutes);
app.use("/api/ngos", ngoRoutes);
app.use("/api/auth", authRoutes);

// Root Route
app.get("/", (req, res) => {
    res.send("NGO Management System API is running...");
});

module.exports = app;

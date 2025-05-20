/** @format */
/* global process */

import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();

// ==========================
// ✅ CORS Middleware 
// ==========================
app.use((req, res, next) => {
	const allowedOrigins = [
		"http://localhost:5173", // Dev frontend
		// "https://your-production-frontend-url.com", // 
	];

	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		res.setHeader("Access-Control-Allow-Origin", origin);
	}

	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-api-key");

	if (req.method === "OPTIONS") {
		return res.sendStatus(200); // Preflight success
	}

	next();
});

// ==========================
// ✅ Parse JSON Requests
// ==========================
app.use(express.json());

// ==========================
// 🔐 API Key Middleware
// ==========================
const API_KEY = process.env.API_KEY || "my-secret-api-key";

app.use((req, res, next) => {
	const userKey = req.headers["x-api-key"];
	if (userKey !== API_KEY) {
		return res.status(401).json({ message: "Unauthorized: Invalid API Key" });
	}
	next();
});

// ==========================
// ✅ Routes
// ==========================
app.get("/", (req, res) => {
	res.json({
		success: true,
		message: "Welcome to DevPath API. Use /api/auth or /api/projects.",
	});
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/upload", uploadRoutes);


// ==========================
// ❌ Fallback 404
// ==========================
app.use("*", (req, res) => {
	res.status(404).json({ success: false, message: "API route not found." });
});

// ==========================
// 🛠️ Debug Route Logging
// ==========================
app._router.stack.forEach((r) => {
	if (r.route && r.route.path) {
		console.log("Registered route:", r.route.path);
	}
});

// ==========================
// 🚀 Start Server
// ==========================
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
	console.log(`✅ Backend running at http://localhost:${PORT}`);
});

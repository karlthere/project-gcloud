/** @format */
// Memberi tahu tool formatter (seperti Prettier) agar file ini diformat otomatis

/* global process */
// Menandakan bahwa variabel `process` adalah variabel global (dari Node.js)

import express from "express"; // Import framework Express.js
import dotenv from "dotenv"; // Import dotenv untuk membaca file .env
import cors from "cors"; // Import CORS untuk mengizinkan akses lintas domain
import authRoutes from "./routes/authRoutes.js"; // Import rute untuk autentikasi
import projectRoutes from "./routes/projectRoutes.js"; // Import rute untuk project CRUD

dotenv.config(); // Membaca file .env dan mengisi variabel environment ke process.env

const app = express(); // Membuat instance dari aplikasi Express

app.get("/", (req, res) => {
	res.json({
		success: true,
		message: "Welcome to DevPath API. Use /api/auth or /api/projects.",
	});
});

app.use(cors()); // Mengaktifkan CORS agar frontend bisa mengakses backend dari domain berbeda
app.use(express.json()); // Middleware untuk parsing request body berformat JSON

// Semua route yang dimulai dengan /api/auth akan diarahkan ke authRoutes
app.use("/api/auth", authRoutes);

// Semua route yang dimulai dengan /api/projects akan diarahkan ke projectRoutes
app.use("/api/projects", projectRoutes);

// Middleware untuk menangani rute yang tidak dikenali (404 Not Found)
app.use("*", (req, res) => {
	res.status(404).json({ success: false, message: "Api url doesn't exist" });
});

// Logging: Menampilkan semua route yang terdaftar di console (debugging tool)
app._router.stack.forEach((r) => {
	if (r.route && r.route.path) {
		console.log("Registered route:", r.route.path);
	}
});

// Ambil PORT dari file .env, jika tidak ada gunakan 5001
const PORT = process.env.PORT || 5001;

// Jalankan server dan tampilkan alamat server di console
app.listen(PORT, () => {
	console.log(`Backend server running on http://localhost:${PORT}`);
});

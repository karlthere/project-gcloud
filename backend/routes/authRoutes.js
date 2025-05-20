/** @format */
// Menandakan file ini diformat otomatis sesuai standar (misalnya oleh Prettier)

import express from "express"; // Import framework Express
const router = express.Router(); // Buat instance router dari Express

// Import controller-function yang menangani logic untuk autentikasi dan profil
import {
	registerUser, // Fungsi untuk mendaftarkan user baru
	loginUser, // Fungsi untuk login user dengan email & password
	changePassword, // Fungsi untuk mengganti password user
	updateProfile,
	getAllUsers, // Fungsi untuk mengubah data profil user (username, email, password)
} from "../controllers/authController.js";

router.get("/users", getAllUsers); // GET /api/auth/users

// Route: POST /register
// Menangani registrasi user baru
router.post("/register", registerUser);

// Route: POST /login
// Menangani login user dan pengecekan kredensial
router.post("/login", loginUser);

// Route: POST /change-password
// Menangani permintaan ganti password user
router.post("/change-password", changePassword);

// Route: PUT /update-profile
// Menangani update profil user (bisa ganti username, email, dan/atau password)
router.put("/update-profile", updateProfile);

// Ekspor router agar bisa digunakan di file utama aplikasi (biasanya di app.js/server.js)
export default router;

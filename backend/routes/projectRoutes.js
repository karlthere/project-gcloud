/** @format */
// Menandakan bahwa file ini diformat otomatis sesuai standar (misalnya oleh Prettier)

import express from "express"; // Import framework Express

// Import controller-function yang menangani logika untuk project
import {
	getProjectsByUser, // Fungsi untuk mengambil semua project milik user tertentu
	createProject, // Fungsi untuk membuat project baru
	updateProject, // Fungsi untuk mengedit project yang sudah ada
	deleteProject, // Fungsi untuk menghapus project berdasarkan ID
} from "../controllers/projectController.js";

// Buat instance router dari Express
const router = express.Router();

// ======================================================
// Route: GET /:userId
// Deskripsi: Mengambil semua project berdasarkan user_id
// Contoh: GET /api/projects/123
// Akan memanggil fungsi getProjectsByUser
// ======================================================
router.get("/:userId", getProjectsByUser);

// ======================================================
// Route: POST /
// Deskripsi: Menambahkan project baru
// Contoh: POST /api/projects
// Akan memanggil fungsi createProject
// ======================================================
router.post("/", createProject);

// ======================================================
// Route: PUT /:id
// Deskripsi: Mengupdate project berdasarkan ID
// Contoh: PUT /api/projects/5
// Akan memanggil fungsi updateProject
// ======================================================
router.put("/:id", updateProject);

// ======================================================
// Route: DELETE /:id
// Deskripsi: Menghapus project berdasarkan ID
// Contoh: DELETE /api/projects/5
// Akan memanggil fungsi deleteProject
// ======================================================
router.delete("/:id", deleteProject);

// Export router agar bisa digunakan di file utama server (biasanya app.js)
export default router;

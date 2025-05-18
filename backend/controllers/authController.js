/** @format */

// Import pool koneksi database dan utilitas hash password
import pool from "../config/db.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";

// ===============================================
// FUNGSI: registerUser
// Mendaftarkan user baru ke sistem
// ===============================================
export const registerUser = async (req, res) => {
	try {
		const { email, username, password } = req.body;

		// Buat tabel users jika belum ada (hanya dijalankan sekali)
		await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        username VARCHAR(255),
        password VARCHAR(255)
      )
    `);

		// Hash password sebelum simpan
		const hashed = await hashPassword(password);

		// Simpan user baru
		await pool.query(
			"INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
			[email, username, hashed]
		);

		// Ambil kembali data user tanpa password
		const [user] = await pool.query(
			"SELECT id, username, email FROM users WHERE email = ?",
			[email]
		);

		res.status(201).json(user[0]);
	} catch (err) {
		console.error("Register Error:", err);
		res.status(500).json({ error: "Failed to register user." });
	}
};

// ===============================================
// FUNGSI: loginUser
// Login user berdasarkan email dan password
// ===============================================
export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Cari user berdasarkan email
		const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
			email,
		]);
		const user = rows[0];

		if (!user) return res.status(404).json({ error: "User not found" });

		// Cek kecocokan password
		const isValid = await comparePassword(password, user.password);
		if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

		// Kirim data user tanpa password
		res.json({ id: user.id, username: user.username, email: user.email });
	} catch (err) {
		console.error("Login Error:", err);
		res.status(500).json({ error: "Failed to login." });
	}
};

// ===============================================
// FUNGSI: updateProfile
// Mengubah username, email, dan (jika ada) password
// ===============================================
export const updateProfile = async (req, res) => {
	try {
		const { id, username, email, password } = req.body;

		if (!id || !username || !email) {
			return res.status(400).json({ message: "Missing fields." });
		}

		let query = "UPDATE users SET username = ?, email = ?";
		let params = [username, email];

		// Jika password juga ingin diubah
		if (password) {
			const hashed = await hashPassword(password);
			query += ", password = ?";
			params.push(hashed);
		}

		query += " WHERE id = ?";
		params.push(id);

		await pool.query(query, params);

		res.json({ message: "Profile updated successfully." });
	} catch (err) {
		console.error("Update Profile Error:", err);
		res.status(500).json({ error: "Failed to update profile." });
	}
};

// ===============================================
// FUNGSI: changePassword
// Ganti password lama ke password baru
// ===============================================
export const changePassword = async (req, res) => {
	try {
		const { id, oldPassword, newPassword } = req.body;

		if (!id || !oldPassword || !newPassword) {
			return res.status(400).json({ message: "All fields are required." });
		}

		const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
		const user = rows[0];

		if (!user) return res.status(404).json({ message: "User not found." });

		const isValid = await comparePassword(oldPassword, user.password);
		if (!isValid)
			return res
				.status(401)
				.json({ message: "Current password is incorrect." });

		const hashed = await hashPassword(newPassword);
		await pool.query("UPDATE users SET password = ? WHERE id = ?", [
			hashed,
			id,
		]);

		res.json({ message: "Password updated successfully." });
	} catch (err) {
		console.error("Change Password Error:", err);
		res.status(500).json({ error: "Failed to change password." });
	}
};

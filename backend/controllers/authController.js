/** @format */

import pool from "../config/db.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";

// ===============================================
// REGISTER USER
// ===============================================
export const registerUser = async (req, res) => {
	try {
		const { email, username, password } = req.body;

		// Buat tabel jika belum ada
		await pool.query(`
			CREATE TABLE IF NOT EXISTS users (
				id INT AUTO_INCREMENT PRIMARY KEY,
				email VARCHAR(255) UNIQUE,
				username VARCHAR(255),
				password VARCHAR(255),
				profile_image TEXT
			)
		`);

		const hashed = await hashPassword(password);

		await pool.query(
			"INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
			[email, username, hashed]
		);

		const [user] = await pool.query(
			"SELECT id, username, email, profile_image FROM users WHERE email = ?",
			[email]
		);

		res.status(201).json(user[0]);
	} catch (err) {
		console.error("Register Error:", err);
		res.status(500).json({ error: "Failed to register user." });
	}
};

// ===============================================
// LOGIN USER
// ===============================================
export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
			email,
		]);
		const user = rows[0];

		if (!user) return res.status(404).json({ error: "User not found" });

		const isValid = await comparePassword(password, user.password);
		if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

		res.json({
			id: user.id,
			username: user.username,
			email: user.email,
			profile_image: user.profile_image,
		});
	} catch (err) {
		console.error("Login Error:", err);
		res.status(500).json({ error: "Failed to login." });
	}
};

// ===============================================
// UPDATE PROFILE (Username, Email, dan Gambar)
// ===============================================
export const updateProfile = async (req, res) => {
	try {
		const { id, username, email, profile_image } = req.body;

		if (!id || !username || !email) {
			return res.status(400).json({ message: "Missing fields." });
		}

		await pool.query(
			"UPDATE users SET username = ?, email = ?, profile_image = ? WHERE id = ?",
			[username, email, profile_image, id]
		);

		res.json({ message: "Profile updated successfully." });
	} catch (err) {
		console.error("Update Profile Error:", err);
		res.status(500).json({ error: "Failed to update profile." });
	}
};

// ===============================================
// GANTI PASSWORD
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

// ===============================================
// GET ALL USERS
// ===============================================
export const getAllUsers = async (req, res) => {
	try {
		const [users] = await pool.query(
			"SELECT id, username, email, profile_image FROM users"
		);
		res.json(users);
	} catch (err) {
		console.error("Get All Users Error:", err);
		res.status(500).json({ error: "Failed to fetch users" });
	}
};

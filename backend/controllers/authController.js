/** @format */

// controllers/authController.js

import { getConnection } from "../config/db.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";

export const registerUser = async (req, res) => {
	const { email, username, password } = req.body;
	const conn = await getConnection();

	await conn.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE,
      username VARCHAR(255),
      password VARCHAR(255)
    )
  `);

	const hashed = await hashPassword(password);
	await conn.query(
		"INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
		[email, username, hashed]
	);

	const [user] = await conn.query(
		"SELECT id, username, email FROM users WHERE email = ?",
		[email]
	);
	res.status(201).json(user[0]);
};

export const loginUser = async (req, res) => {
	const { email, password } = req.body;
	const conn = await getConnection();

	const [rows] = await conn.query("SELECT * FROM users WHERE email = ?", [
		email,
	]);
	const user = rows[0];

	if (!user) return res.status(404).json({ error: "User not found" });

	const isValid = await comparePassword(password, user.password);
	if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

	res.json({ id: user.id, username: user.username, email: user.email });
};

export const updateProfile = async (req, res) => {
	const { id, username, email, password } = req.body;
	if (!id || !username || !email) {
		return res.status(400).json({ message: "Missing fields." });
	}

	const conn = await getConnection();

	let query = "UPDATE users SET username = ?, email = ?";
	let params = [username, email];

	if (password) {
		const hashed = await hashPassword(password);
		query += ", password = ?";
		params.push(hashed);
	}

	query += " WHERE id = ?";
	params.push(id);

	await conn.query(query, params);
	res.json({ message: "Profile updated successfully." });
};

export const changePassword = async (req, res) => {
	const { id, oldPassword, newPassword } = req.body;

	if (!id || !oldPassword || !newPassword) {
		return res.status(400).json({ message: "All fields are required." });
	}

	const conn = await getConnection();

	const [rows] = await conn.query("SELECT * FROM users WHERE id = ?", [id]);
	const user = rows[0];

	if (!user) return res.status(404).json({ message: "User not found." });

	const isValid = await comparePassword(oldPassword, user.password);
	if (!isValid)
		return res.status(401).json({ message: "Current password is incorrect." });

	const hashed = await hashPassword(newPassword);
	await conn.query("UPDATE users SET password = ? WHERE id = ?", [hashed, id]);

	res.json({ message: "Password updated successfully." });
};

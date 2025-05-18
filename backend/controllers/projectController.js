/** @format */

import pool from "../config/db.js"; // Gunakan pool dari mysql2

// ======================================================
// ✅ Fungsi: getProjectsByUser
// Mengambil semua project milik user tertentu
// ======================================================
export const getProjectsByUser = async (req, res) => {
	const { userId } = req.params;

	try {
		const [projects] = await pool.query(
			"SELECT * FROM projects WHERE user_id = ?",
			[userId]
		);
		res.json(projects);
	} catch (error) {
		console.error("Get Projects Error:", error);
		res.status(500).json({ success: false, message: "Failed to get projects" });
	}
};

// ======================================================
// ✅ Fungsi: createProject
// Menambahkan project baru ke database
// ======================================================
export const createProject = async (req, res) => {
	const {
		user_id,
		title,
		category,
		difficulty,
		tags,
		image_url,
		github_link,
		status,
		description,
		references,
	} = req.body;

	try {
		await pool.query(
			`INSERT INTO projects 
			(user_id, title, category, difficulty, status, tags, image_url, github_link, description, \`references\`) 
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				user_id,
				title,
				category,
				difficulty,
				status,
				tags,
				image_url,
				github_link,
				description,
				references,
			]
		);
		res.status(201).json({ success: true, message: "Project created" });
	} catch (error) {
		console.error("Create Project Error:", error);
		res
			.status(500)
			.json({ success: false, message: "Failed to create project" });
	}
};

// ======================================================
// ✅ Fungsi: updateProject
// Memperbarui data project berdasarkan ID
// ======================================================
export const updateProject = async (req, res) => {
	const { id } = req.params;
	const {
		title,
		category,
		difficulty,
		status,
		tags,
		image_url,
		github_link,
		description,
		references,
	} = req.body;

	try {
		await pool.query(
			`UPDATE projects SET 
			title = ?, 
			category = ?, 
			difficulty = ?, 
			status = ?, 
			tags = ?, 
			image_url = ?, 
			github_link = ?, 
			description = ?, 
			\`references\` = ? 
			WHERE id = ?`,
			[
				title,
				category,
				difficulty,
				status,
				tags,
				image_url,
				github_link,
				description,
				references,
				id,
			]
		);
		res.json({ success: true, message: "Project updated" });
	} catch (error) {
		console.error("Update Project Error:", error);
		res
			.status(500)
			.json({ success: false, message: "Failed to update project" });
	}
};

// ======================================================
// ✅ Fungsi: deleteProject
// Menghapus project berdasarkan ID
// ======================================================
export const deleteProject = async (req, res) => {
	const { id } = req.params;

	try {
		await pool.query("DELETE FROM projects WHERE id = ?", [id]);
		res.json({ success: true, message: "Project deleted" });
	} catch (error) {
		console.error("Delete Project Error:", error);
		res
			.status(500)
			.json({ success: false, message: "Failed to delete project" });
	}
};

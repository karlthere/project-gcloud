/** @format */

// Import koneksi pool dari file config
import pool from "../config/db.js";

// ======================================================
// ✅ Fungsi: getProjectsByUser
// Digunakan untuk mengambil semua proyek berdasarkan user_id
// Route: GET /api/projects/:userId
// ======================================================
export const getProjectsByUser = async (req, res) => {
	const { userId } = req.params;

	try {
		const [projects] = await pool.query(
			"SELECT * FROM projects WHERE user_id = ?",
			[userId]
		);
		res.json(projects); // kirim hasil sebagai JSON
	} catch (error) {
		console.error("Get Projects Error:", error);
		res.status(500).json({ success: false, message: "Failed to get projects" });
	}
};

// ======================================================
// ✅ Fungsi: createProject
// Digunakan untuk menambahkan proyek baru ke database
// Route: POST /api/projects
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
		// Debug log payload (opsional, untuk cek data)
		console.log("Creating project with data:", req.body);

		const [result] = await pool.query(
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

		// Kirim respon sukses + ID baru
		res
			.status(201)
			.json({ success: true, message: "Project created", id: result.insertId });
	} catch (error) {
		console.error("Create Project Error:", error);
		res
			.status(500)
			.json({ success: false, message: "Failed to create project" });
	}
};

// ======================================================
// ✅ Fungsi: updateProject
// Digunakan untuk mengupdate proyek berdasarkan ID
// Route: PUT /api/projects/:id
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
		const [result] = await pool.query(
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

		res.json({
			success: true,
			message: "Project updated",
			affectedRows: result.affectedRows,
		});
	} catch (error) {
		console.error("Update Project Error:", error);
		res
			.status(500)
			.json({ success: false, message: "Failed to update project" });
	}
};

// ======================================================
// ✅ Fungsi: deleteProject
// Digunakan untuk menghapus proyek berdasarkan ID
// Route: DELETE /api/projects/:id
// ======================================================
export const deleteProject = async (req, res) => {
	const { id } = req.params;

	try {
		const [result] = await pool.query("DELETE FROM projects WHERE id = ?", [
			id,
		]);

		res.json({
			success: true,
			message: "Project deleted",
			affectedRows: result.affectedRows,
		});
	} catch (error) {
		console.error("Delete Project Error:", error);
		res
			.status(500)
			.json({ success: false, message: "Failed to delete project" });
	}
};

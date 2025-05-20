/** @format */
/*global process */

// routes/uploadRoutes.js
import express from "express";
import multer from "multer";
import { Storage } from "@google-cloud/storage";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Setup multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Google Cloud Storage init
const gcs = new Storage({
	projectId: process.env.GCLOUD_PROJECT_ID,
	keyFilename: process.env.GCLOUD_KEY_FILE,
});
const bucket = gcs.bucket(process.env.GCLOUD_BUCKET_NAME);

// Upload route
router.post("/", upload.single("image"), async (req, res) => {
	try {
		if (!req.file) return res.status(400).json({ error: "No file uploaded" });

		const ext = path.extname(req.file.originalname);
		const blob = bucket.file(`uploads/${uuidv4()}${ext}`);
		const blobStream = blob.createWriteStream({
			resumable: false,
			contentType: req.file.mimetype,
		});

		blobStream.on("error", (err) => {
			console.error("Blob stream error:", err);
			res.status(500).json({ error: "Upload failed" });
		});

		blobStream.on("finish", async () => {
			try {
				await blob.makePublic(); 
				const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
				res.status(200).json({ image_url: publicUrl });
			} catch (err) {
				console.error("Error making file public:", err);
				res.status(500).json({ error: "Failed to make file public" });
			}
		});

		blobStream.end(req.file.buffer);
	} catch (err) {
		console.error("Upload error:", err);
		res.status(500).json({ error: "Server error" });
	}
});

export default router;

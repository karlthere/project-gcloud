/** @format */
/* global process */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);


app.use("*", (req, res) => {
	res.status(404).json({ success: false, message: "Api url doesn't exist" });
});

app._router.stack.forEach((r) => {
	if (r.route && r.route.path) {
		console.log("Registered route:", r.route.path);
	}
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
	console.log(`Backend server running on http://localhost:${PORT}`);
});

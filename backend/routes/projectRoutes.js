/** @format */

import express from "express";
import {
	getProjectsByUser,
	createProject,
	updateProject,
	deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/:userId", getProjectsByUser);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;

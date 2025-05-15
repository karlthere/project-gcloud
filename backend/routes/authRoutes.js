/** @format */

import express from "express";
const router = express.Router(); 

import {
	registerUser,
	loginUser,
	changePassword,
	updateProfile, 
} from "../controllers/authController.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/change-password", changePassword);
router.put("/update-profile", updateProfile); 

export default router;

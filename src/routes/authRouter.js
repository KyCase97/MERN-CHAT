import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from "../controller/authController.js";
import { protectedMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /api/v1/auth/register
router.post("/register", registerUser);

// POST /api/v1/auth/login
router.post("/login", loginUser);

// GET /api/v1/auth/logout
router.get("/logout", protectedMiddleware, logoutUser);

// GET /api/v1/auth/getUser
router.get("/getUser", protectedMiddleware, getCurrentUser);

export default router;

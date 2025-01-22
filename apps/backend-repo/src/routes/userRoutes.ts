import { Router } from "express";
import { UserController } from "@/controller/api";
import { authMiddleware } from "@/middleware/authMiddleware";

const router = Router();

// Protected routes - require authentication
router.post("/create-user", authMiddleware, UserController.createUser);
router.put("/update-user-data", authMiddleware, UserController.updateUserData);
router.get("/fetch-user-data", authMiddleware, UserController.fetchUserData);

export const userRoutes: Router = router;

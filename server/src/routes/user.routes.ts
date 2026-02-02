import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import { getProfile, loginUser, logoutUser, registerUser } from "../controllers/user.controller";

const router = Router();

router.post("/register" , registerUser);
router.put("/login" , loginUser);
router.get("/profile" , getProfile);
router.post("/logout" , logoutUser);

export default router;
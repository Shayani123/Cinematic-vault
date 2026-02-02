import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import { addComment, getComment } from "../controllers/comment.controller";

const router = Router();

//user
router.post("/:movieId" , auth , addComment);

//public
router.get("/:movieId" , auth , getComment);

export default router;
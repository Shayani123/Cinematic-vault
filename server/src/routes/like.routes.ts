import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import { likeMovie, unlikeMovie } from "../controllers/like.controller";

const router = Router();

router.post("/like" , auth , likeMovie);
router.get("/like" ,async () => {
    
})
router.delete("/like" , auth , unlikeMovie);

export default router;
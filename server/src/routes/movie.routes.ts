import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";
import { createByMovie, deleteMovie, getByMovie, getMovie, updateByMovie } from "../controllers/movie.controller";
import express from "express";

const router = express.Router();
console.log(router)
//ADMIN
router.post("/movies" ,auth , isAdmin ,createByMovie);
router.put("/movies/:id" , auth , isAdmin , updateByMovie);
router.delete("/movies/:id" , auth , isAdmin, deleteMovie);



//All User
router.get("/movies" , getMovie);
router.get("/movies/:id" , getByMovie);

export default router;
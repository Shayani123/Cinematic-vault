import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import { addWatchlist, getWatchlist, removeWatchlist } from "../controllers/watchlist.controlles";
import pool from "../db";

const router = Router();

// router.post("/" , auth , addWatchlist );
// router.get("/watchlist" , auth , getWatchlist );
router.delete("/:id" , auth , removeWatchlist);

router.post("/watchlist" , async(req, res) => {
    try {
        const {user_id , movie_id} = req.body;
        console.log(req.body);
        await pool.query(
            "INSERT INTO watchlist(user_id, movie_id) VALUES($1,$2)",
            [user_id , movie_id]
        );
        res.json({message : "Added to watchlist"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message : "Failed"});
    }
});

router.get("/watchlist" , async(req , res) => {
    // const {id} = req.params;
    const {user_id} = req.body;
    // const {user_id} = req.params;
    // console.log(req.body);
    const result = await pool.query(
        `SELECT movies. *
        FROM watchlist
        JOIN movies ON watchlist.movie_id = movies.id
        WHERE watchlist.user_id = $1`,
        [user_id]
    );
    res.json(result.rows);
});

export default router;
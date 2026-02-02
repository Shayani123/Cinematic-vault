import { Router , Request, Response } from "express";
// import { upload } from "../middleware/upload.middleware";
import pool from "../db";
import multer from "multer";
import cloudinary from "../utils/cloudinary";
import { getByMovie } from "../controllers/movie.controller";

const router = Router();
const upload = multer({storage: multer.memoryStorage()});

//post request for Add-movie button
router.post("/movies" , upload.fields([ 
    {name: "image", maxCount: 1},
    {name: "video", maxCount:1},
]),
async (req,res) => {
    try {
        const {title , description, poster_url, imageurl , videourl} = req.body;
        console.log(req.body);
        await pool.query(
            `INSERT INTO movies(title, description,poster_url, image, video) VALUES($1,$2,$3,$4,$5)`,
            [title, description, poster_url, imageurl, videourl]
        );
        res.json({message : "Movie add successfully",});
    } catch (error) {
        console.error(error);
        res.status(500).json({error : "Movie upload failed"});
    }
}
);

//get movie
router.get("/all", async(req,res) => {
    const movies = await pool.query("SELECT * FROM movies");
    res.json(movies.rows);
});

//Upload image
router.post("/image" , upload.single("file"), async(req: Request , res: Response) => {
    try {
        if(!req.file) {
            return res.status(400).json({message : "Image not Upload"});
        }
            
        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
            {folder: "movies/images"}
        );
        res.json({
            message: "Image upload successfully",
            imageurl : result.secure_url,
            public_id: result.public_id,
        });

    } catch (error) {
        res.status(500).json({message : "Image upload failed"});
    }
});

//Upload video
router.post("/video" , upload.single("file"), async(req,res) => {
    try {
        if(!req.file) return res.status(400).json({message : "Video not upload"});
    
        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}` ,
            {
                resource_type: "video",
                folder : "movies/videos",
            }
        );
        res.json({
            message : "Video upload successfully",
            videourl : result.secure_url,
            public_id: result.public_id,
        });
        
    } catch (error) {
        res.status(500).json({message : "Video upload failed"});
    }
});

//get request for show Add-movies
router.get("/movie" , async(req,res) => {   
    try {
        const result = await pool.query("SELECT * FROM movies ORDER BY id DESC");
        const movie = result.rows.map(m => ({
            ...m,
            image: m.image ? `${m.image.toString("base64")}` : null,
            video: m.video ? `${m.video.toString("base64")}` : null,
        }));
        // res.json(result.rows);
        res.json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to fetch movie" });
    }
});


router.get("/movies/:id" , getByMovie);

export default router;
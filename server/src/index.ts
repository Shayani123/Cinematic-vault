import express from "express";
import pool from "./db";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/user.routes"
import uploadRoutes from "./routes/upload.routes";
import movieRoutes from "./routes/movie.routes";
import watchlistRoutes from "./routes/watchlist.routes";
import likeRoutes from "./routes/like.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5174

app.use(
    cors({
        origin : "http://localhost:3000",
        credentials : true,
        methods : ["GET" , "POST" , "PUT" ,"DELETE" , "OPTIONS"],
        allowedHeaders : ["Content-type" , "Authorization"],
    })
);
app.use(cors());
app.use(express.json());

//Test API
// app.get('/api/health' , (rerq,res) =>{
//     res.json({message : "Backend connected successfully"});
// });
app.use("/api/auth" ,authRoutes);
app.use(express.urlencoded({extended : true}));
app.use("/uploads" , express.static("src/uploads"));
app.use("/api/movies", movieRoutes);
app.use("/api", uploadRoutes);
app.use("/api" , watchlistRoutes);
app.use("/api" , likeRoutes);
app.get('/' , async(req , res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.status(200).json({
            message : "Database connection successfully",
            timeStamp : result.rows[0].now ,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Database connection failed");
    }
});

app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
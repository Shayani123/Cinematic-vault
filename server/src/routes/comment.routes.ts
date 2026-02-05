import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import { addComment, getComment } from "../controllers/comment.controller";
// import { PrismaClient } from "@prisma/client";

const router = Router();
// const prisma = new PrismaClient();

// //user
router.post("/comments/:movieId", auth , addComment);

// router.post("/comments/:movieId", auth , async(req,res) => {
//     const {movieId} = req.params;
//     const {comment} = req.body;
//     const userId = req.user!.id;

//     const newComment = await prisma.comment.create({
//         data: {
//             comment , 
//             movie_id : movieId,
//             user_id : userId
//         },
//     });
//     res.json({message: "Comment added" , newComment});
// })

// //public
router.get("/comments/:movieId"  , getComment);

// router.get("/comments/:movieId" , async(req, res) => {
//     const comment = await prisma.comment.findMany({
//         where : {movieId},
//         include: {
//             user: {select : {name : true}},
//         },
//     });
//     res.json(comment);
// });

// router.get("/comments/:movieId" , async(req, res) => {
//     const {movieId} = req.params;
//     const comments = await prisma.comment.findMany({
//         where: {
//             movie_id: movieId, //match DB field name
//         },
//         include: {
//             user: {
//                 select: {name : true},
//             },
//         },
//     });
//     res.json(comments);
// });
export default router;
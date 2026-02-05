import * as CommentService from "../services/comment.services";
import { Request , Response } from "express";

//Add new comment 
export const addComment = async(req : any , res : Response) => {
    const { movieId } = req.params;
    const {comment} = req.body;
    const userId = req.user.id;  

    if(!comment) {
        return res.status(400).json({message : "Comment required"});
    }
    const newComment = await CommentService.addToComment(userId , movieId , comment);
    res.status(201).json(newComment);
};

//get comment 
export const getComment = async(req : any , res : Response) => {
    // const movieId = String(req.params.movieId);
    const {movieId} = req.params;
    const comment = await CommentService.getMovieComment(movieId );
    console.log(comment);
    res.json(comment);
};
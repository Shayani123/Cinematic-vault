import { Request, Response } from "express";
import * as MovieService from "../services/movie.services"



//Admin create movie
export const createByMovie = async (req : Request , res : Response) => { 
    // try {
    //     const {title , description} = req.body;
    //     const image = req.files?.["image"]?.[0]?.filename;
    //     const video = req.files?.["video"]?.[0]?.filename;

    //     const movie = await MovieService.createMovie({
    //         title, description, image, video,
    //     });
    //     res.status(201).json(movie);
    // } catch (error) {
    //    console.error(error);
    //    res.status(500).json({message  :"Movie not created"}); 
    // }
    const movie = await MovieService.createMovie(req.body);
    res.status(201).json(movie);
}; 

//Admin update movie
export const updateByMovie = async (req : Request , res:Response) => {
    const id = Number(req.params.id);
    const movie = await MovieService.updateMovieById(id , req.body);
    
    if(!movie) {
        return res.status(404).json({message : "Movie not found"});
    }
    res.json(movie);
};

//Admin delete movie
export const deleteMovie = async(req : Request , res : Response) => {
    const id = Number(req.params.id);
    await MovieService.deleteMovieById(id , req.body);
    res.json({message : "Movie Deleted"});

};

//All user see all movie
export const getMovie = async(req : Request , res : Response) => {
    const movie = await MovieService.getAllMovie();
    res.json(movie);
};

//All user search any movie  / get single movie
export const getByMovie = async (req : Request , res : Response) => {
    const id = String(req.params.id);
    const movie = await MovieService.getMovieById(id);
    if(!movie) {
        return res.status(404).json({message : "Movie not found"});
    }
    res.json(movie);
};

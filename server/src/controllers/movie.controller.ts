import { Request, Response } from "express";
import * as MovieService from "../services/movie.services"
import { error } from "node:console";
import cloudinary from "../utils/cloudinary";
import { Result } from "pg";



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
    const id = req.params.id as string;
    const {title , description , poster_url} = req.body;
    let imageurl = req.body.image; // old img url
    console.log("body data: ",req.body);
    console.log( "file data: ", req.file);
    
    if(req.file) {
        const result = await cloudinary.uploader.upload( 
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`, 
            {folder:"movies/images"});
            imageurl = result.secure_url;
            console.log(imageurl);
    }
    
    const movie = await MovieService.updateMovieById(id , {
        title , description , poster_url , image: imageurl
    });
    
    if(!movie) {
        return res.status(404).json({message : "Movie not found"});
    } 
    res.json(movie);
};

//Admin delete movie
export const deleteMovie = async(req : Request , res : Response) => {
    try {
        const id = req.params.id as string;
        console.log("Deleted id : ",id);
        const deleted = await MovieService.deleteMovieById(id);
        if(!deleted) return res.status(404).json({error: "Movie not found"});
        res.json({message : "Movie Deleted" , movie: deleted});
    } catch (error) {
        console.error("Delete Error : " ,error );
        res.status(500).json({error:"Internal Server Error"});
    }
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

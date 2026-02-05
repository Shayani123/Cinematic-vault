import { Request , Response } from "express";
import * as WatchlistService from "../services/watchlist.services";

//User create watchlist by id
export const addWatchlist = async (req : any , res : Response) => {
    const userId = req.user.id;
    // const movieId = String(req.params.id);
    console.log(userId);
    const {movieId} = req.body;
    console.log(movieId);
    const movie = await WatchlistService.addToWatchlist(userId , movieId);
    res.json(movie);
};


//User show watchlist
export const getWatchlist = async (req : any , res : Response) => {
    const userId = req.user.id;
    const watchlist = await WatchlistService.getUserWatchlist(userId);
    res.json(watchlist);
    // const id = String(req.params.id);
    // const watchlist = await WatchlistService.getUserWatchlist(id);
    // if(!watchlist) return res.status(404).json({message : "Movie not found"});
    // res.json(watchlist);
};

//User delete Movie watchlist
export const removeWatchlist = async(req : any , res : Response) => {
    const userId = req.user?.id;
    const movieId = Number(req.params.id);
    await WatchlistService.removeFromWatchlist(userId , movieId);
    res.json({message : "Movie remove from watchlist"});
};
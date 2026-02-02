import * as likeService from "../services/like.services";

//User like movie
export const likeMovie = async(req : any , res : any) => {
    const userId = req.user?.id;
    const movieId = String(req.params.id);
    const like = await likeService.likeMovie(userId , movieId);
    if(!like) {
        return res.status(400).json({message : "Movie already liked"});
    }
    res.status(201).json({message : "Movie Liked"});
};

//delete like 
export const unlikeMovie = async(req : any , res : any) => {
     const userId = req.user.id;
     const movieId = String(req.params.id);
     await likeService.removelike(userId , movieId);
     res.json({message : "Like Removed"});
};

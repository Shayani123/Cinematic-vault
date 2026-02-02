import pool from "../db";

export const addToWatchlist = async( userId : string , movieId : string) => {
    
    const result = await pool.query(
        `INSERT INTO watchlist( user_id , movie_id) VALUES($1,$2) RETURNING *` ,
        [ userId , movieId]
    );
    return result.rows[0];
};

export const getUserWatchlist = async (id : string) => {
    const result = await pool.query(
        `SELECT w.id , m.*
        FROM watchlist w
        JOIN movies m 
        ON w.movie_id = m.id
        WHERE w.user_id = $1`,
        [id]
    );
    return result.rows[0];
};

export const removeFromWatchlist = async (userId: number , movieId:number ) => {
    const result = await pool.query(
        `DELETE FROM watchlist 
        WHERE user_id = $1 AND movie_id = $2`,
        [userId , movieId]
    );
    return result.rows[0];
};
import pool from "../db";

export const likeMovie = async (userId : string , movieId : string) => {
    
    const result = await pool.query(
        `INSERT INTO likes (user_id , movie_id)
        VALUES($1,$2)
        ON CONFLICT (user_id , movie_id) DO NOTHING
        RETURNING *`,
        [userId , movieId]
    );
    return result.rows[0];
};

export const removelike = async (userId : string , movieId : string) => {
    const result = await pool.query(
        `DELETE FROM likes
        WHERE user_id = $1 AND movie_id = $2`, [userId , movieId]
    );
    return result.rows[0];
};

// CHECK IF LIKE 
export const isMovieliked = async (userId : string , movieId : string) => {
    const result = await pool.query(
        `SELECT 1 FROM likes
        WHERE user_id = $1 AND movie_id = $2`,
        [userId , movieId]
    );
};
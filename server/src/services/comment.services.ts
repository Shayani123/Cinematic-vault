import pool from "../db";

//Add comment user
export const addToComment = async (userId : string , movieId : string , comment : string)  => {
    const result = await pool.query(
        `INSERT INTO comments (user_id , movie_id , comment) 
        VALUES($1,$2,$3)
        RETURNING *`,
        [userId , movieId, comment]
    );
    return result.rows[0];
};

//All user comment
export const getMovieComment = async (movieId:string ) => {
    const result = await pool.query(
        `SELECT c.id, c.comment , u.name
        FROM comments c
        JOIN users u 
        ON c.user_id = u.id
        WHERE c.movie_id = $1 
        ORDER BY c.created_at DESC` ,
        [movieId ]
    );
    return result.rows;
};


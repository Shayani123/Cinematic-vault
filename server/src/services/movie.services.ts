import pool from "../db";

export const createMovie = async (data :any) => {
    const {title , description , poster_url , video , image } = data;
    const result = await pool.query(
        `INSERT INTO movies(title , description , image, video) VALUES($1,$2,$3,$4) RETURNING *` ,
        [title , description , image, video]
    );
    return result.rows[0];
};

export const updateMovieById = async (id : string , data : any) => {
    const {title , description , poster_url , image} = data;

    const result = await pool.query(
        `UPDATE movies 
        SET title =$1 , description=$2 , poster_url=$3, image=$4
        WHERE id=$5
        RETURNING *`,
        [title , description, poster_url , image , id]
    );
    return result.rows[0];
};

export const deleteMovieById = async (id:string) => {
    // const {title , description, video , image} = data;

    // console.log("DB DELETE ID : ", id);
    await pool.query("DELETE FROM watchlist WHERE movie_id=$1", [id]);
    const result = await pool.query(
        "DELETE FROM movies WHERE id=$1 RETURNING *" ,
        [id]
    );
    return result.rows[0];
};

export const getAllMovie = async() => {
    const result = await pool.query("SELECT * FROM movies ORDER BY created_at DESC");
    return result.rows[0];
};

export const getMovieById = async(id:string) => {
    const result = await pool.query("SELECT * FROM movies WHERE id=$1" , [id]);
    return result.rows[0];
};
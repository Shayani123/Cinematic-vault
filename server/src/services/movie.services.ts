import pool from "../db";

export const createMovie = async (data :any) => {
    const {title , description , poster_url , video , image } = data;
    const result = await pool.query(
        `INSERT INTO movies(title , description , image, video) VALUES($1,$2,$3,$4) RETURNING *` ,
        [title , description , image, video]
    );
    return result.rows[0];
};

export const updateMovieById = async (id : number , data : any) => {
    const {title , description} = data;

    const result = await pool.query(
        `UPDATE movies 
        SET title =$1 , description=$2 
        WHERE id=$3
        RETURNING *`,
        [title , description, id]
    );
    return result.rows[0];
};

export const deleteMovieById = async (id : number , data : any) => {
    // const {title , description, video , image} = data;

    const result = await pool.query(
        "DELETE FROM movies WHERE id=$1" ,
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
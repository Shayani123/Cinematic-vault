import pool from "../db";

export const getUserByEmail = async(email :string) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );
    return result.rows[0];
};

export const getUserById = async (id :number) => {
    const result = await pool.query(
        "SELECT id , name , email , created_at FROM users WHERE id = $1",
        [id]
    );
    return result.rows[0];
};

export const createUser = async(
    name : string ,
    email : string,
    password : string
) => {
    const result = await pool.query(
        "INSERT INTO users(name, email, password) VALUES ($!,$2, $3) RETURNING id,name,email",
        [name , email , password]
    );
    return result.rows[0];
};
import { Request , Response  } from "express";
import { createUser, getUserByEmail, getUserById } from "../services/user.services";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db";

//User register
export const registerUser = async(req : Request , res : Response) => {
    try {
        console.log(req.body);
        const {name , email , password} = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({message : "All field are required"});
        }
        //check eisting user 
        const existing = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );
        if(existing.rows.length>0) {
            return res.status(400).json({message : "User already exists"});
        }

        //hash password
        const hashed = await bcrypt.hash(password , 8);
        
        //insert user 
        const result = await pool.query(
            `INSERT INTO users (name , email , password) VALUES ($1,$2,$3)
            RETURNING id,name,email,role`,
            [name , email, hashed]
        );
        res.status(201).json({
            message : "User register successfully",
            user : result.rows[0],
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({message : "Server Error"});
    }
};


//user login
export const loginUser = async(req : Request , res: Response) => {
    try {
        const {email , password} = req.body;

        //check user exist 
        const userResult = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );
        const user = userResult.rows[0];
        if(!user) return res.status(404).json({message : "User not found"});

        //check password
        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch) return res.status(401).json({message : "Password incorrect"});

        //generate JWT token
        const token = jwt.sign(
            {id : user.id} , process.env.JWT_SECRET! , {expiresIn : "1d"}
        );

        res.json({
            message : "Login Successfully",
            token,
            user : {
                id : user.id,
                name : user.name,
                email : user.email,
                role : user.role,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message : "Server Error"});
    }
};

//User Profile 
export const getProfile = async(req : any , res : Response) => {
    try {
        const authHeader = req.headers.Authorization;
        if(!authHeader) return res.status(401).json({message : "No token provided"});

        const token = authHeader.split(" ")[1];
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

        const userResult = await pool.query(
            "SELECT id ,name,email, role FROM users WHERE id=$1",
            [decoded.id]
        );

        const user = userResult.rows[0];
        if(!user) return res.status(404).json({message : "User not found"});
        res.json({user});
    } catch (error) {
        console.error(error);
        res.status(401).json({message : "Invalid Token"});
    }
};

//User Logout 
export const logoutUser = async(req:Request , res: Response) => {
    const { refreshToken } = req.body;
    await pool.query(
        "DELETE FROM refresh_tokens WHERE token = $1",
        [refreshToken]
    );
    res.json({message : "Logout successfully"});
}
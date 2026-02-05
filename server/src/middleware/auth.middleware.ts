import jwt from "jsonwebtoken";
import { Request , Response , NextFunction } from "express";

interface JwtPayload {
    id : string,
    email: string,
    role : string
}

export const auth = (req : Request  , res : Response , next : NextFunction) => {
    const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

    if(!token) {
        return res.status(401).json({
            message : "No Token provided"
        });
    }

    try {
        const decoded = jwt.verify(
            token , 
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        (req as any).user = decoded;

        // req.userId = decoded.id;
        next();

    } catch (error) {
        res.status(401).json({
            message : "Invalid Token"
        });
    }
};


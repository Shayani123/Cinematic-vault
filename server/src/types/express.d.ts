import { Request } from "express";
import {Multer} from "multer";
// import {User} from "@prisma/client";

interface JwtUser {
    id : number;
    email: string;
    role : string;
}

declare global {
    namespace Express {
        interface Request {
            // user? : JwtUser;
            file? : Multer.File;
            user?:{
                id: string;
                email?: string;
                role?: string;
            };
        }
    }
}
export {};
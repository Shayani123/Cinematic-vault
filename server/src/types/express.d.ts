import { Request } from "express";
import {Multer} from "multer";

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
        }
    }
}
export {};
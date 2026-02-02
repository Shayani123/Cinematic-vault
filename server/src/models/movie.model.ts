import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === "image") cb(null, "src/uploads/images");
        else cb(null , "src/uploads/videos");
    },
    filename: (req,file,cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

export const upload = multer({storage});
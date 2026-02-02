import multer from "multer";
import path from "path";
import fs from "fs";

const imageDir = "uploads/images";
const videoDir = "uploads/videos";

fs.mkdirSync(imageDir , {recursive: true});
fs.mkdirSync(videoDir, {recursive: true});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.mimetype.startsWith("image")) {
            cb(null , imageDir);
        } else if(file.mimetype.startsWith("video")) {
            cb(null , videoDir);
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

export const upload = multer({storage});

// export const upload = multer({
//     storage : multer.memoryStorage(),
//     limits: {
//         fileSize: 50*1024**1024, //50MB
//     },
// });
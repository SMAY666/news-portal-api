import multer from 'multer';
import * as fs from 'fs';
import path from 'path';
import {v4 as uuidv4} from 'uuid';

import {PUBLIC_DIR} from '@constants/path';


export const fileStorage = (dir: string) => {
    fs.mkdir(path.join(PUBLIC_DIR, dir), {recursive: true}, (err) => {
        if (err) {
            console.log(err);
        }
    });
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(PUBLIC_DIR, dir));
        },
        filename(req, file, cb) {
            cb(null, generateFilename() + path.extname(file.originalname));
        },
    });
};

function generateFilename() {
    return `${uuidv4()}-${Date.now()}`;
}

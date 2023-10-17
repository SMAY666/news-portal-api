import multer from 'multer';
import {PUBLIC_DIR, USERS_DIR} from '@constants/path';
import {fileStorage} from '@utils/multer';
import path from 'path';
import fs from 'fs';
import {logger} from '@utils/logger';
import {getErrorMessage} from '@utils/error';

export const userUpload = multer({
    storage: fileStorage(USERS_DIR),
});


export function deleteFileFromStorage(pathToFile: string): Promise<number> {
    return new Promise((resolve) => {
        const globalFilePath = path.join(PUBLIC_DIR, pathToFile);
        try {
            const stats = fs.statSync(globalFilePath);
            fs.unlinkSync(globalFilePath);
            resolve(stats.size);
        } catch (error) {
            logger.warn(getErrorMessage(error));
            resolve(0);
        }
    });
}

import multer, {Field} from 'multer';
import {Request, Response, NextFunction} from 'express';
import path from 'path';
import {deleteFileFromStorage} from '@utils/fileTools';
import {logger} from '@utils/logger';


export function uploadFiles(uploader: ReturnType<typeof multer>, options: string | Field | Field[]) {
    function getMulterData() {
        if (typeof options === 'string') {
            return uploader.single(options);
        } else if (Array.isArray(options)) {
            return uploader.fields(options);
        } else {
            return uploader.array(options.name, options.maxCount);
        }
    }

    function deleteFile(request: Request) {
        const files: Express.Multer.File[] = [];

        if (request.file) {
            files.push(request.file);
        } else if (Array.isArray(request.files)) {
            files.push(...request.files);
        } else if (request.files) {
            Object.values(request.files).forEach((item) => {
                if (Array.isArray(item)) {
                    files.push(...(item as Express.Multer.File[]));
                } else {
                    files.push(item as Express.Multer.File);
                }
            });
        }
        files.forEach((item) => {
            const pathToFile = path.relative(process.cwd() + '/public', item.path!);
            deleteFileFromStorage(pathToFile)
                .then()
                .catch((err) => logger.warn('[uploadFiles] Failed to delete file: ', {path: item.path, error: err}));
        });
    }

    return (request: Request, response: Response, next: NextFunction) => {
        response.on('close', () => {
            if (response.statusCode < 200 || response.statusCode > 299) {
                deleteFile(request);
            }
        });

        const multerData = getMulterData();

        multerData(request, response, (err: any | undefined) => {
            if (!request.body) {
                request.body = Object.create(null);
            }
            if (typeof options == 'string') {
                request.body[options] = request.file;
            } else if (Array.isArray(options)) {
                // @ts-ignore
                options.map(({name}) => request.body[name] = request.files?.[name]);
            } else {
                request.body[options.name] = request.files;
            }
            next(err);
        });
    };
}

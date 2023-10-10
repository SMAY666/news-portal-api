import {NextFunction, Request, Response} from 'express';
import {getErrorMessage} from '@utils/error';


export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err) {
        res.status(err.status ?? 500).json(getErrorMessage(err));
    }
}

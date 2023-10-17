import {NextFunction, Request, Response} from 'express';
import {getErrorMessage} from '@utils/error';
import {ExtendedErrorType} from '@interfaces/common';


export function errorHandler(err: ExtendedErrorType, req: Request, res: Response, next: NextFunction) {
    if (err) {
        res.status(err.statusCode ?? 500).json(getErrorMessage(err));
    }
}

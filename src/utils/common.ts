import {ExtendedErrorType} from '@interfaces/common';

export const CustomError = (data: string | {[key: string]: any }, statusCode?: number) => {
    let error: ExtendedErrorType;

    if (typeof data !== 'string') {
        error = new Error() as ExtendedErrorType;
        error.data = data;
    } else {
        error = new Error(data) as ExtendedErrorType;
    }

    error.statusCode = statusCode;
    return error;
};

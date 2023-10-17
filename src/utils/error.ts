type ErrorWithMessage = {
    message: string;
};


function convertToErrorWithMessage(maybeError: unknown): ErrorWithMessage {
    if (isErrorWithMessage(maybeError)) {
        return maybeError;
    }

    try {
        return new Error(JSON.stringify(maybeError));
    } catch {
        return new Error(String(maybeError));
    }
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
    return (
        (typeof error === 'object') &&
        (error !== null) &&
        ('message' in error) &&
        (typeof (error as Record<string, unknown>)['message'] === 'string')
    );
}


export function getErrorMessage(error: unknown): string {
    return convertToErrorWithMessage(error).message;
}

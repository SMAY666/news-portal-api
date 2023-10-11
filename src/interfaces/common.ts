import {LoggerOptions} from '@utils/logger';
import {RequiredProperty} from '@utils/types';


interface ExpressError extends Error {
    code: string
    name: string
    statusCode?: number
}


export type ExtendedErrorType = ExpressError & {
    data: any
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            HOST: string
            PORT: number

            LOGGING_LEVEL: RequiredProperty<LoggerOptions, 'level'>['level']
            LOG_FILE_PATH: string

            CLIENT_URL: string

            JWT_SECRET: string

            MONGO_DB_HOST: string
            MONGO_DB_PORT: number
            MONGO_DB_BUFFER_COMMANDS: boolean
            MONGO_DB_NAME: string
            MONGO_DB_USER: string
            MONGO_DB_PASSWORD: string
            MONGO_DB_AUTO_INDEX: boolean
            MONGO_DB_AUTO_CREATE: boolean

            JWT_SALT: string
        }
    }
}

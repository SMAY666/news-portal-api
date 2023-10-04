import {LoggerOptions} from '@utils/logger';
import {RequiredProperty} from '@utils/types';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            HOST: string
            PORT: number

            LOGGING_LEVEL: RequiredProperty<LoggerOptions, 'level'>['level']
            LOG_FILE_PATH: string

            MONGO_DB_HOST: string
            MONGO_DB_PORT: number
            MONGO_DB_BUFFER_COMMANDS: boolean
            MONGO_DB_NAME: string
            MONGO_DB_USER: string
            MONGO_DB_PASSWORD: string
            MONGO_DB_AUTO_INDEX: boolean
            MONGO_DB_AUTO_CREATE: boolean
        }
    }
}

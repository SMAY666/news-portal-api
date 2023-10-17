import 'dotenv/config';
import 'module-alias/register';

import {cleanEnv, str, host, port, bool, url} from 'envalid';


Object.assign(
    process.env,
    cleanEnv(process.env, {
        LOGGING_LEVEL: str({
            choices: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'],
            devDefault: 'debug',
            default: 'info',
        }),
        LOG_FILE_PATH: str({
            default: 'log.txt',
        }),

        HOST: host({
            default: '0.0.0.0',
            devDefault: '127.0.0.1',
        }),
        PORT: port({
            default: 8001,
        }),

        CLIENT_URL: url({
            default: 'http://localhost:3000',
        }),

        JWT_SECRET: str({
            default: 'test',
        }),

        MONGO_DB_HOST: host({
            default: '127.0.0.1',
        }),
        MONGO_DB_PORT: port({
            default: 27017,
        }),
        MONGO_DB_BUFFER_COMMANDS: bool({
            default: false,
        }),
        MONGO_DB_NAME: str({
            default: 'news-portal',
        }),
        MONGO_DB_USER: str(),
        MONGO_DB_PASSWORD: str(),
        MONGO_DB_AUTO_INDEX: bool({
            default: true,
        }),
        MONGO_DB_AUTO_CREATE: bool({
            default: true,
        }),

        JWT_SALT: str(),
    }),
);

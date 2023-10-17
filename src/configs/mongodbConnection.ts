import {connect} from 'mongoose';

import {Logger, logger} from '@utils/logger';
import {getErrorMessage} from '@utils/error';


class MongodbConnection {
    constructor() {
        this.logger = logger.child({module: this.constructor.name});
    }

    // ----- [ PRIVATE MEMBERS ] ---------------------------------------------------------------------------------------

    private readonly logger: Logger;


    // ----- [ PUBLIC METHODS ] ----------------------------------------------------------------------------------------

    public async connect(): Promise<void> {
        return connect(`mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}`, {
            bufferCommands: process.env.MONGO_DB_BUFFER_COMMANDS,
            dbName: process.env.MONGO_DB_NAME,
            user: process.env.MONGO_DB_USER,
            pass: process.env.MONGO_DB_PASSWORD,
            autoIndex: process.env.MONGO_DB_AUTO_INDEX,
            autoCreate: process.env.MONGO_DB_AUTO_CREATE,
        })
            .then(() => this.logger.info('[connect] Connection successfully established'))
            .catch((error) => {
                this.logger.fatal(`[connect] Failed to establish connection: ${getErrorMessage(error)}`);
                throw error;
            });
    }
}

export const mongodbConnection = new MongodbConnection();

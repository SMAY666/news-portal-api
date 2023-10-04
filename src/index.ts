import './validateEnvironment';
import Express from 'express';
import {mongodbConnection} from '@configs/mongodbConnection';
import {logger} from '@utils/logger';


const server = Express();

mongodbConnection.connect()
    .then()
    .catch((err) => {
        logger.fatal('[mongodb]: Failed to connect to database ', {err});
        process.exit(1);
    });

server.listen(process.env.PORT, () => {
    console.log(`Server started on http://${process.env.HOST}:${process.env.PORT}`);
});


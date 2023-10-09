import './validateEnvironment';

import Express from 'express';
import cors from 'cors';

import {mongodbConnection} from '@configs/mongodbConnection';
import {logger} from '@utils/logger';
import {apiRouter} from './routes';
import {getErrorMessage} from '@utils/error';


const server = Express()
    .use(Express.json())
    .use(Express.urlencoded({extended: true}))
    .use(cors({
        origin: process.env.CLIENT_URL,
    }))
    .use('/api', apiRouter)
    // @ts-ignore
    .use((err, req, res, next) => {
        if (err) {
            res.status(err.status ?? 500).json(getErrorMessage(err));
        }
    });


mongodbConnection.connect()
    .then()
    .catch((err) => {
        logger.fatal('[mongodb]: Failed to connect to database ', {err});
        process.exit(1);
    });

server.listen(process.env.PORT, () => {
    console.log(`Server started on http://${process.env.HOST}:${process.env.PORT}`);
});


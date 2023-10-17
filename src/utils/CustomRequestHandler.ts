import {RequestHandler} from 'express';

export type CustomRequestHandler<T extends {Params?: any, Querystring?: any, Body?: any, Response: any}> = RequestHandler<
    T['Params'] extends undefined ? undefined : T['Params'],
    T['Response'] extends undefined ? undefined : T['Response'],
    T['Body'] extends undefined ? undefined : T['Body'],
    T['Querystring'] extends undefined ? undefined : T['Querystring']
>;

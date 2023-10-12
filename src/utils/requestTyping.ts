import {Request} from 'express';


export type CreateRequest<T extends {Params?: any, Querystring?: any, Body?: any, Response: any}> = Request<
    T['Params'] extends undefined ? never : T['Params'],
    never,
    T['Body'] extends undefined ? never : T['Body'],
    T['Querystring'] extends undefined ? never : T['Querystring'],
    T['Response'] extends undefined ? never : T['Response']
>

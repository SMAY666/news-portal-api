import {Request} from 'express';


export interface SignInRequest extends Request<
    never,
    string,
    {
        email: string
        password: string
    }>{}


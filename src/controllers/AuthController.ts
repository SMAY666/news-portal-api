import {Request, Response} from 'express';
import {authService} from '@services/authService';
import {UserAttributes, UserCreationAttributes} from '../types/models/UserModel';
import {CustomError} from '../types/common';


class AuthController {
    public async signUp(request: Request<never, UserAttributes, UserCreationAttributes>, response: Response<UserAttributes | CustomError>) {
        const newUser = await authService.signUp(request.body);
        return response.status((newUser as CustomError).status ?? 201).json(newUser);
    }
}

export const controller = new AuthController();

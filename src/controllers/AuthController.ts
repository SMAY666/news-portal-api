import {Request, Response} from 'express';
import {authService} from '@services/authService';
import {UserAttributes, UserCreationAttributes} from '../types/models/UserModel';


class AuthController {
    public signUp(request: Request<never, UserAttributes, UserCreationAttributes>, response: Response) {
        authService.signUp(request.body)
            .then((newUser) => response.status(201).json(newUser))
            .catch((err) => {
                response.status(err.status ?? 500)
                    .json(err.data);
            });
    }
}

export const controller = new AuthController();

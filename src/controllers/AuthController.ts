import {NextFunction, Request, Response} from 'express';
import {authService} from '@services/authService';
import {UserAttributes, UserCreationAttributes} from '../types/models/UserModel';


class AuthController {
    public signUp(request: Request<never, UserAttributes, UserCreationAttributes>, response: Response, next: NextFunction) {
        authService.signUp(request.body)
            .then((newUser) => response.status(201).json(newUser))
            .catch(next);
    }
}

export const controller = new AuthController();

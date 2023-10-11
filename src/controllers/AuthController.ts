import {NextFunction, Request, Response} from 'express';
import {authService} from '@services/authService';
import {UserCreationAttributes} from '../types/models/UserModel';
import {SignInRequest} from '../types/requests/auth/signIn';


class AuthController {
    public signUp(request: Request<never, never, UserCreationAttributes>, response: Response, next: NextFunction) {
        authService.signUp(request.body)
            .then((newUser) => response.status(201).json(newUser))
            .catch(next);
    }

    public signIn(request: SignInRequest, response: Response, next: NextFunction) {
        authService.signIn(request.body.email, request.body.password)
            .then((token) => response.status(200).json(token))
            .catch(next);
    }
}

export const controller = new AuthController();

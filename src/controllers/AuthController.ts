import {authService} from '@services/authService';
import {SignInRequest, SignUpRequest} from '../types/requests/auth';
import {CustomRequestHandler} from '@utils/CustomRequestHandler';


class AuthController {
    public signUp: CustomRequestHandler<SignUpRequest> = (request, response, next) => {
        authService.signUp(request.body)
            .then((newUser) => response.status(201).json(newUser))
            .catch(next);
    };

    public signIn: CustomRequestHandler<SignInRequest> = (request, response, next) => {
        authService.signIn(request.body.email, request.body.password)
            .then((token) => response.status(200).json(token))
            .catch(next);
    };
}

export const controller = new AuthController();

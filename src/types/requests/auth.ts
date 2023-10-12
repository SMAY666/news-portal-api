import {UserAttributes, UserCreationAttributes} from '../models/UserModel';

export type SignUpRequest = {
    Body: UserCreationAttributes
    Response: UserAttributes
};

export type SignInRequest = {
    Body: {
        email: string
        password: string
    },
    Response: string
};

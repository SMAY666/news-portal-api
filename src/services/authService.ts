import bcrypt from 'bcrypt';
import {UserAttributes, UserCreationAttributes} from '../types/models/UserModel';
import {UserModel} from '@models/UserModel';
import {ERRORS} from '@constants/errors';
import {CustomError} from '../types/common';


class AuthService {
    public getHash(password: string): string {
        return bcrypt.hashSync(password, process.env.JWT_SALT);
    }

    public async signUp(data: UserCreationAttributes): Promise<UserAttributes | CustomError> {
        const userExist = await UserModel.exists({email: data.email});
        if (userExist) {
            return ERRORS.USER.ALREADY_EXIST;
        }

        if (data.confirmPassword !== data.password) {
            return ERRORS.USER.NOT_FOUND;
        }

        const passwordHash = this.getHash(data.password);

        return await UserModel.create({
            email: data.email,
            passwordHash,
            isOwner: data.isOwner,
            avatar: data.avatar,
            favorites: [],
        });
    }
}

export const authService = new AuthService();

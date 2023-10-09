import bcrypt from 'bcrypt';
import {UserCreationAttributes} from '../types/models/UserModel';
import {UserModel} from '@models/UserModel';
import {ERRORS} from '@constants/errors';
import {logger} from '@utils/logger';


class AuthService {
    public getHash(password: string): string {
        return bcrypt.hashSync(password, process.env.JWT_SALT);
    }

    public async signUp(data: UserCreationAttributes) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({email: data.email})
                .then((user) => {
                    if (user) {
                        reject(ERRORS.USER.ALREADY_EXIST);
                        return;
                    }

                    if (data.confirmPassword !== data.password) {
                        reject(ERRORS.USER.PASSWORD_NOT_CONFIRMED);
                        return;
                    }

                    const passwordHash = this.getHash(data.password);

                    return UserModel.create({
                        email: data.email,
                        passwordHash,
                        isOwner: data.isOwner,
                        avatar: data.avatar,
                        favorites: [],
                    });
                })
                .then((newUser) => {
                    resolve(newUser);
                })
                .catch((err) => {
                    logger.error('[sign-up]: Failed to execute query', {err});
                    reject(err);
                });
        });
    }
}

export const authService = new AuthService();

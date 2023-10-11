import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {UserCreationAttributes} from '../types/models/UserModel';
import {UserModel} from '@models/UserModel';
import {ERRORS} from '@constants/errors';
import {logger} from '@utils/logger';
import {CustomError} from '@utils/common';
import {HOUR} from '@constants/time';


class AuthService {
    // ----- [PRIVATE METHODS] -----------------------------------------------------------------------------------------------------------------------

    private generateToken(userId: string) {
        return jwt.sign({
            userId: userId,
            expiresIn: Date.now() + HOUR * 24,
        }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
    }

    // ----- [PUBLIC METHODS] ------------------------------------------------------------------------------------------------------------------------

    public getHash(password: string): string {
        return bcrypt.hashSync(password, process.env.JWT_SALT);
    }

    public async signUp(data: UserCreationAttributes) {
        return UserModel.findOne({email: data.email})
            .then((user) => {
                if (user) {
                    throw CustomError(ERRORS.USER.ALREADY_EXIST, 403);
                }

                if (data.confirmPassword !== data.password) {
                    throw CustomError(ERRORS.USER.PASSWORD_NOT_CONFIRMED, 403);
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
            .then((newUser) => newUser)
            .catch((err) => {
                logger.error('[sign-up]: Failed to execute query', {err});
                throw err;
            });
    }

    public async signIn(email: string, password: string) {
        return UserModel.findOne({email})
            .then((user) => {
                if (!user) {
                    throw CustomError(ERRORS.USER.NOT_FOUND, 404);
                }

                if (this.getHash(password) !== user.passwordHash) {
                    throw CustomError(ERRORS.USER.INVALID_PASSWORD, 403);
                }

                return this.generateToken(user._id);
            })
            .catch((err) => {
                logger.error('[sign-in]: Failed to execute query', {err});
                throw err;
            });
    }
}

export const authService = new AuthService();

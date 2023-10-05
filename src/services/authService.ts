import bcrypt from 'bcrypt';
import {UserAttributes, UserCreationAttribute} from '../types/models/UserModel';
import {UserModel} from '@models/UserModel';


class AuthService {
    public getHash(password: string): string {
        return bcrypt.hashSync(password, process.env.JWT_SALT);
    }

    public async signUp(data: UserCreationAttribute, confirmPassword: string): Promise<UserAttributes> {
        const userExist = await UserModel.find({email: data.email});
        if (userExist) {
            throw Error('Пользователь с таким email уже существует');
        }

        if (confirmPassword !== data.password) {
            throw Error('Пароли не совпадают');
        }

        const passwordHash = this.getHash(data.password);

        return await UserModel.create({
            email: data.email,
            passwordHash,
            isOwner: data.isOwner,
            avatar: data.avatar,
        });
    }
}

export const authService = new AuthService();

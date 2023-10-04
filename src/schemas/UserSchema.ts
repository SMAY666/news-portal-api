import {Schema} from 'mongoose';
import {UserAttributes} from '../types/models/UserModel';
import validator from 'validator';


export const userSchema = new Schema<UserAttributes>({
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) => validator.isEmail(value),
        },
    },
    passwordHash: {
        type: String,
        required: true,
    },
    isOwner: {
        type: Boolean,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    },
});

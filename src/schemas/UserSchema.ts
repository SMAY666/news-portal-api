import {Schema} from 'mongoose';
import {UserAttributes} from '../types/models/UserModel';
import validator from 'validator';


export const userSchema = new Schema<UserAttributes>({
    _id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
        required: true,
    },
    favorites: {
        type: [String],
        required: false,
    },
});

import {model} from 'mongoose';
import {UserAttributes} from '../types/models/UserModel';
import {userSchema} from '../schemas/UserSchema';


export const userModel = model<UserAttributes>('users', userSchema);

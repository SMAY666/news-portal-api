import {model} from 'mongoose';
import {UserAttributes} from '../types/models/UserModel';
import {userSchema} from '../schemas/UserSchema';


export const UserModel = model<UserAttributes>('users', userSchema);

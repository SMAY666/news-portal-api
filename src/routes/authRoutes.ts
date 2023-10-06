import {Router} from 'express';
import {controller} from '@controllers/AuthController';


export const authRoutes = Router();

authRoutes.post('/sign-up', controller.signUp);

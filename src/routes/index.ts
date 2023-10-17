import {Router} from 'express';
import {authRoutes} from './authRoutes';

export const apiRouter = Router();

apiRouter.use('/auth', authRoutes);

import {Router} from 'express';
import {controller} from '@controllers/AuthController';
import {userUpload} from '@utils/fileTools';
import {uploadFiles} from '@middlewares/uploadFiles';


export const authRoutes = Router();

authRoutes.post('/sign-up', uploadFiles(userUpload, 'avatar'), controller.signUp);
authRoutes.post('/sign-in', controller.signIn);

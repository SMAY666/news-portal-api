import {UserModel} from '@models/UserModel';
import {authService} from '@services/authService';
import {USER_DEFAULT_AVATAR} from '@constants/storage';
import {logger} from '@utils/logger';


function createMainOwner() {
    return UserModel.create({
        email: process.env.MAIN_OWNER_EMAIL,
        passwordHash: authService.getHash(process.env.MAIN_OWNER_PASSWORD),
        isOwner: true,
        avatar: USER_DEFAULT_AVATAR,
        favorites: [],
    });
}
export function checkOwner() {
    UserModel.findOne({isOwner: true})
        .then((user) => {
            if (!user) {
                createMainOwner()
                    .then(() => logger.info('[checkOwner]: Owner created successfully'))
                    .catch((err) => {
                        logger.fatal('[checkOwner]: Failed to create owner', {err});
                        process.exit(1);
                    });
            }
        })
        .catch((err) => {
            logger.error('[checkOwner]: Something was wrong', {err});
        });
}

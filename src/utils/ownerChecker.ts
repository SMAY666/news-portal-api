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
                    .then(() => logger.info('[ownerChecker]: Owner created successfully'))
                    .catch((err) => logger.error('[ownerChecker]: Failed to create owner', {err}));
            }
        })
        .catch((err) => {
            logger.error('[ownerChecker]: Something was wrong', {err});
        });
}

import {NewsCreationAttribute} from '../types/models/NewsModel';
import {NewsModel} from '@models/NewsModel';
import {logger} from '@utils/logger';
import {CustomError} from '@utils/common';
import {ERRORS} from '@constants/errors';

class NewsRepository {
    public create(data: NewsCreationAttribute) {
        return new Promise((resolve) => {
            if (data.coverPaths.length === 0) {
                throw CustomError(ERRORS.NEWS.COVER_NOT_LOADED, 403);
            }
            NewsModel.create({
                ...data,
                createdAt: Date.now(),
                reactions: {
                    like: 0,
                    dislike: 0,
                    poop: 0,
                },
            })
                .then((news) => resolve(news))
                .catch((err) => logger.error('[news-create]: Failed to create news', {err}));
        });
    }
}

export const newsRepository = new NewsRepository();

import {Schema} from 'mongoose';
import {NewsAttributes} from '../types/models/NewsModel';
import {ThemeEnum} from '@interfaces/models/newsModel';


export const newsSchema = new Schema<NewsAttributes>({
    createdAt: {
        type: Date,
        required: true,
    },
    theme: {
        type: String,
        enum: ThemeEnum,
        required: true,
    },
    coverPaths: {
        type: [String],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    test: {
        type: String,
        required: true,
    },
    reactions: {
        like: {
            type: Number,
            required: true,
        },
        dislike: {
            type: Number,
            required: true,
        },
        poop: {
            type: Number,
            required: true,
        },
    },
    favouritesCount: {
        type: Number,
        required: true,
    },
});

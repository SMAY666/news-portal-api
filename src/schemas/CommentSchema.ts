import {Schema} from 'mongoose';
import {CommentAttributes} from '../types/models/CommentModel';


export const commentSchema = new Schema<CommentAttributes>({
    newsId: {
        type: String,
        required: true,
    },
    senderId: {
        type: String,
        required: false,
    },
    content: {
        type: String,
        required: true,
    },
});

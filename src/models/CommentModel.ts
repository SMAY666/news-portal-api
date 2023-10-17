import {model} from 'mongoose';
import {commentSchema} from '../schemas/CommentSchema';


export const CommentModel = model('comments', commentSchema)

import {model} from 'mongoose';
import {newsSchema} from '../schemas/NewsSchema';
import {NewsAttributes} from '../types/models/NewsModel';


export const NewsModel = model<NewsAttributes>('news', newsSchema);

import {model} from 'mongoose';
import {newSchema} from '../schemas/NewSchema';
import {NewsAttributes} from '../types/models/NewsModel';


const NewsModel = model<NewsAttributes>('news', newSchema);

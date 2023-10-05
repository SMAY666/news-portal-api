import {model} from 'mongoose';
import {NewSchema} from '../schemas/NewSchema';
import {NewsAttributes} from '../types/models/NewsModel';


const newsModel = model<NewsAttributes>('news', NewSchema);
